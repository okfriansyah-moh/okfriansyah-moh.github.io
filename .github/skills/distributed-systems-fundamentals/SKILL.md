---
name: distributed-systems-fundamentals
description: "Apply distributed systems fundamentals to production architecture. Use when designing systems with multiple nodes, handling network partitions, choosing consistency models, or implementing distributed coordination patterns."
---

# Distributed Systems Fundamentals

## When to Use

- Designing systems that span multiple nodes or services
- Choosing between consistency and availability trade-offs
- Implementing distributed locking, leader election, or coordination
- Handling network partitions and partial failures
- Evaluating whether a system actually needs distribution

## Rules

1. Network calls will fail — design for it, not around it
2. Choose your consistency model explicitly — don't accidentally end up with eventual consistency
3. Distributed transactions are expensive — prefer saga patterns or eventual consistency where acceptable
4. Clocks are unreliable across nodes — use logical clocks or database sequences for ordering
5. Every distributed call must have a timeout and retry policy
6. Prefer idempotent operations — at-least-once delivery is far simpler than exactly-once
7. Data locality matters — minimize cross-service data fetching in hot paths
8. CAP theorem is a real constraint — understand which partition behavior your system chooses
9. Observability is non-negotiable — distributed tracing, structured logging, metrics from day one

## Patterns

### Saga Pattern for Distributed Transactions
```
Step 1: Create Order → (compensate: Cancel Order)
Step 2: Reserve Inventory → (compensate: Release Inventory)
Step 3: Charge Payment → (compensate: Refund Payment)

On failure at Step N:
  Execute compensation for Steps N-1 → 1
```

### Idempotent Consumer
```go
func HandleEvent(ctx context.Context, event Event) error {
    // Dedup using event ID
    processed, err := db.IsProcessed(ctx, event.ID)
    if err != nil {
        return err
    }
    if processed {
        return nil // Already handled
    }

    if err := processEvent(ctx, event); err != nil {
        return err
    }

    return db.MarkProcessed(ctx, event.ID)
}
```

### Distributed Locking with Timeout
```sql
-- Advisory lock with timeout in PostgreSQL
SELECT pg_try_advisory_lock($1);
-- Returns true if lock acquired, false if held by another

-- Always release
SELECT pg_advisory_unlock($1);
```

### Health Check and Circuit Breaking
```
Service A → Circuit Breaker → Service B
                ↓ (if open)
            Fallback / Cached Response
```

### Outbox Pattern for Reliable Events
```sql
BEGIN;
  INSERT INTO orders (id, amount) VALUES ($1, $2);
  INSERT INTO outbox (event_type, payload, published)
    VALUES ('order.created', $3, false);
COMMIT;

-- Separate process polls outbox and publishes to message broker
```

### Consistent Hashing for Data Distribution
```
Nodes: [A, B, C, D]
Key hash → ring position → nearest node
Adding/removing nodes only redistributes ~1/N of keys
```

## Anti-Patterns

- **Distributed monolith**: Microservices that must be deployed together and share a database
- **Synchronous chains**: Service A → B → C → D synchronously — latency and failure multiply
- **Two-phase commit everywhere**: Using distributed transactions where sagas would suffice
- **Clock-dependent ordering**: Relying on wall clock timestamps for event ordering across services
- **Missing idempotency**: Assuming messages are delivered exactly once
- **No tracing**: Distributed system with no way to trace a request across services
- **Chatty services**: Services making dozens of cross-network calls per request
- **Ignoring partial failures**: Assuming all nodes either all succeed or all fail

## Checklist

- [ ] Consistency model is explicitly chosen and documented
- [ ] Every network call has timeout and retry policy
- [ ] Operations are idempotent where possible
- [ ] Distributed tracing is implemented
- [ ] Partial failure scenarios are handled
- [ ] No reliance on wall clock ordering across nodes
- [ ] Data locality is considered for hot paths
- [ ] Saga or outbox pattern used instead of distributed transactions
- [ ] Health checks and circuit breakers in place
- [ ] System behavior under network partition is defined
