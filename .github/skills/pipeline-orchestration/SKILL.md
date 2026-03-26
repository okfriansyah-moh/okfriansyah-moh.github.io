---
name: pipeline-orchestration
description: "Design and implement pipeline orchestration systems. Use when building worker coordination, job scheduling, multi-stage data processing, or AI workflow pipelines with reliable execution guarantees."
---

# Pipeline Orchestration

## When to Use

- Building multi-stage AI pipelines
- Designing worker coordination systems
- Implementing job scheduling with retry logic
- Coordinating distributed processing stages

## Rules

1. Orchestrator is the single authority for execution order
2. Workers must not communicate directly — all coordination goes through the orchestrator
3. Each pipeline stage has a defined input contract and output contract
4. Retry logic lives in the orchestrator, not in workers
5. Backpressure must be handled explicitly
6. Dead letter queues for permanently failed jobs
7. Pipeline progress must be queryable at any time

## Patterns

### Orchestrator-Worker Architecture
```
Cron/Trigger → Orchestrator
                    ├── Stage 1: Worker A
                    ├── Stage 2: Worker B  
                    ├── Stage 3: Worker C
                    └── State Machine (DB)
```

### Stage Transition
```
PENDING → RUNNING → COMPLETED
                  → FAILED → RETRY → RUNNING
                           → DEAD_LETTER
```

### Worker Contract
```python
def execute(input: StageInput) -> StageOutput:
    # Pure function: same input → same output
    # No side effects beyond the returned output
    # Raises on failure (orchestrator handles retry)
```

### Fan-Out / Fan-In
- Orchestrator dispatches N parallel tasks
- Collects results with timeout
- Proceeds only when all succeed (or handles partial failure)

## Anti-Patterns

- **Peer-to-peer workers**: Workers calling other workers directly
- **Shared mutable state**: Workers modifying shared resources without coordination
- **Unbounded retries**: Retrying forever without escalation
- **Missing observability**: No way to query pipeline state
- **Tight coupling**: Workers that know about other workers' internals
- **Synchronous chains**: Blocking the entire pipeline on one slow stage

## Checklist

- [ ] Orchestrator owns all execution decisions
- [ ] Workers are stateless and isolated
- [ ] Stage transitions are atomic in the database
- [ ] Retry policy is explicit with max attempts
- [ ] Dead letter handling exists for permanent failures
- [ ] Pipeline state is queryable
- [ ] Backpressure is handled
- [ ] Timeouts are configured for each stage
