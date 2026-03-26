---
name: idempotency
description: "Design idempotent operations and workers. Use when building retry-safe systems, ensuring operations can be safely re-executed, or designing workers that produce consistent results on repeated invocation."
---

# Idempotency Patterns

## When to Use

- Designing workers that must be safely retryable
- Building operations that may be executed more than once
- Implementing at-least-once delivery guarantees
- Ensuring data consistency across retries

## Rules

1. Every operation must produce the same result when executed multiple times with the same input
2. Use idempotency keys to deduplicate requests
3. Check-then-act must be atomic (no TOCTOU races)
4. Side effects must be guarded by completion checks
5. External API calls must be wrapped with idempotency protection
6. Database writes must use upsert or conditional insert patterns

## Patterns

### Idempotency Key
```python
def process(job_id: str, input: Input) -> Output:
    existing = db.get_result(job_id)
    if existing:
        return existing  # Already processed
    
    result = compute(input)
    db.save_result(job_id, result)  # Atomic write
    return result
```

### Database Upsert
```sql
INSERT INTO results (job_id, output, status)
VALUES ($1, $2, 'completed')
ON CONFLICT (job_id) DO NOTHING;
```

### External API Idempotency
```python
def call_external_api(request_id: str, payload: dict):
    headers = {"Idempotency-Key": request_id}
    response = api.post("/action", json=payload, headers=headers)
    return response
```

### Conditional State Transition
```sql
UPDATE jobs SET status = 'completed', output = $2
WHERE id = $1 AND status = 'running';
-- Returns 0 rows affected if already completed
```

## Anti-Patterns

- **Non-atomic check-then-act**: Checking state in one query and updating in another without locking
- **Append-only without dedup**: Inserting new records on every retry
- **Assuming exactly-once**: Designing as if operations will never be retried
- **Side effects outside transaction**: Sending emails or API calls before committing DB state
- **Counter increments on retry**: Using `UPDATE SET count = count + 1` without idempotency guard

## Checklist

- [ ] Every worker operation is idempotent
- [ ] Idempotency keys are used for deduplication
- [ ] Database operations use upsert or conditional patterns
- [ ] External API calls include idempotency headers
- [ ] State transitions are atomic
- [ ] No side effects compound on retry
- [ ] Tests verify behavior on double-execution
