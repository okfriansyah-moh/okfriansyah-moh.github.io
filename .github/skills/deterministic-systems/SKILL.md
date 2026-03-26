---
name: deterministic-systems
description: "Design deterministic AI systems and pipelines. Use when building or reviewing systems that require reproducible execution, avoiding non-deterministic agent behavior, or enforcing orchestrator patterns over autonomous chaos."
---

# Deterministic Systems Design

## When to Use

- Designing AI pipeline architectures
- Reviewing systems for determinism guarantees
- Choosing between orchestrator and agent patterns
- Ensuring reproducibility in AI workflows

## Rules

1. Every pipeline stage must produce identical output given identical input
2. Use orchestrator pattern — a central coordinator dispatches work and manages flow
3. All state transitions must go through a database-backed state machine
4. No pipeline stage should have hidden side effects
5. Random seeds must be explicit and configurable
6. LLM calls must include temperature=0 or explicit seed where supported
7. All external API responses must be cached or recorded for replay

## Patterns

### Orchestrator Pattern
```
Scheduler → Orchestrator → Worker Pool → State Machine (DB)
```
- Orchestrator owns the execution plan
- Workers are stateless and idempotent 
- State machine tracks progress atomically
- Failed stages can be retried without side effects

### Pipeline Stage Contract
Each stage must:
- Accept explicit inputs (no implicit global state)
- Write outputs to a defined location
- Record completion in the state machine
- Be safely re-runnable

### Deterministic LLM Integration
- Pin model versions
- Use temperature=0
- Cache responses keyed by (prompt_hash, model_version)
- Validate outputs against schema before proceeding

## Anti-Patterns

- **Agent chaos**: Autonomous agents making unbounded decisions without orchestrator oversight
- **In-memory state**: Tracking workflow progress only in application memory
- **Implicit dependencies**: Stages that depend on side effects from other stages
- **Non-reproducible LLM calls**: Using temperature > 0 without capturing the seed
- **Fire-and-forget**: Dispatching work without tracking completion

## Checklist

- [ ] Every pipeline stage is idempotent
- [ ] State machine is database-backed
- [ ] Orchestrator controls execution flow
- [ ] All inputs/outputs are explicit
- [ ] LLM calls are deterministic or cached
- [ ] Failed stages can be retried safely
- [ ] No hidden side effects between stages
