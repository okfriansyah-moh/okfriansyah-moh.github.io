---
name: database-state-machines
description: "Design database-backed state machines for workflow orchestration. Use when implementing workflow state tracking, ensuring atomic state transitions, building recovery-safe pipelines, or replacing in-memory state with durable persistence."
---

# Database-Backed State Machines

## When to Use

- Implementing workflow state tracking for pipelines
- Replacing in-memory state with durable, queryable persistence
- Designing recovery-safe job processing systems
- Building audit trails for state transitions
- Coordinating multi-stage operations with rollback support

## Rules

1. Database is the single source of truth for all workflow state — no in-memory-only tracking
2. Every state transition must be atomic — use transactions or conditional updates
3. Valid transitions must be explicitly defined — reject invalid state changes at the DB layer
4. Every state record must include timestamps for created_at, updated_at, and transition history
5. State queries must be efficient — index on status columns used for polling
6. Dead states must have explicit timeout and cleanup policies
7. State machines must be idempotent — re-applying the same transition produces the same result
8. All state transitions must be auditable — log who/what triggered the change

## Patterns

### State Table Schema
```sql
CREATE TABLE job_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    input JSONB NOT NULL,
    output JSONB,
    error TEXT,
    attempts INT DEFAULT 0,
    max_attempts INT DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    CONSTRAINT valid_status CHECK (
        status IN ('pending', 'running', 'completed', 'failed', 'dead_letter')
    )
);

CREATE INDEX idx_job_states_status ON job_states (status);
CREATE INDEX idx_job_states_type_status ON job_states (job_type, status);
```

### Atomic State Transition
```sql
UPDATE job_states
SET status = 'running',
    attempts = attempts + 1,
    updated_at = now()
WHERE id = $1
  AND status IN ('pending', 'failed')
  AND attempts < max_attempts
RETURNING *;
```

### Transition Guard in Application Code
```go
func TransitionTo(ctx context.Context, jobID string, from, to string) error {
    result, err := db.ExecContext(ctx,
        `UPDATE job_states SET status = $1, updated_at = now()
         WHERE id = $2 AND status = $3`,
        to, jobID, from,
    )
    if rows, _ := result.RowsAffected(); rows == 0 {
        return ErrInvalidTransition
    }
    return err
}
```

### State Machine Definition
```
pending → running → completed
                  → failed → running (retry)
                           → dead_letter (max attempts)
```

### Polling for Work
```sql
SELECT * FROM job_states
WHERE status = 'pending'
  AND job_type = $1
ORDER BY created_at ASC
LIMIT 10
FOR UPDATE SKIP LOCKED;
```

## Anti-Patterns

- **In-memory state**: Tracking job progress in application memory — lost on crash
- **String-based status without constraints**: Allowing arbitrary status values
- **Non-atomic transitions**: Reading status in one query, updating in another without locking
- **Missing indexes on status**: Polling queries scanning full tables
- **No timeout on running state**: Jobs stuck in "running" forever after worker crash
- **Implicit transitions**: No defined state machine — any status can change to any other
- **No audit trail**: State changes with no record of when or why they happened

## Checklist

- [ ] State table has explicit status constraint
- [ ] All transitions use conditional UPDATE (WHERE status = expected)
- [ ] Status columns are indexed for polling queries
- [ ] Running jobs have a timeout/heartbeat mechanism
- [ ] Failed jobs track attempt count with max limit
- [ ] Dead letter state exists for permanently failed jobs
- [ ] State transitions are logged/auditable
- [ ] No in-memory-only workflow state in production
