---
name: failure-handling-and-retries
description: "Design robust failure handling and retry strategies. Use when implementing retry logic, circuit breakers, dead letter queues, timeout policies, or graceful degradation in distributed systems."
---

# Failure Handling and Retries

## When to Use

- Implementing retry logic for external API calls
- Designing circuit breakers for unreliable dependencies
- Building dead letter queue processing
- Defining timeout and backoff strategies
- Ensuring graceful degradation under partial failure

## Rules

1. Every external call must have a timeout — no unbounded waits
2. Retries must use exponential backoff with jitter — never fixed-interval retries
3. Max retry count must be explicit — no infinite retry loops
4. Retryable vs non-retryable errors must be distinguished — do not retry 400 Bad Request
5. Circuit breakers must protect against cascading failures to unhealthy dependencies
6. Dead letter queues must exist for permanently failed operations
7. Failure metrics must be tracked — error rate, retry rate, dead letter rate
8. Partial failures in batch operations must not block the entire batch

## Patterns

### Exponential Backoff with Jitter
```go
func backoff(attempt int) time.Duration {
    base := time.Second * time.Duration(math.Pow(2, float64(attempt)))
    jitter := time.Duration(rand.Int63n(int64(base / 2)))
    return base + jitter
}

func retry(ctx context.Context, maxAttempts int, fn func() error) error {
    for attempt := 0; attempt < maxAttempts; attempt++ {
        err := fn()
        if err == nil {
            return nil
        }
        if !isRetryable(err) {
            return err // Non-retryable, fail immediately
        }
        select {
        case <-ctx.Done():
            return ctx.Err()
        case <-time.After(backoff(attempt)):
        }
    }
    return ErrMaxRetriesExceeded
}
```

### Circuit Breaker
```go
type CircuitBreaker struct {
    failureThreshold int
    resetTimeout     time.Duration
    failures         int
    state            string // closed, open, half-open
    lastFailure      time.Time
}

func (cb *CircuitBreaker) Execute(fn func() error) error {
    if cb.state == "open" {
        if time.Since(cb.lastFailure) > cb.resetTimeout {
            cb.state = "half-open"
        } else {
            return ErrCircuitOpen
        }
    }
    err := fn()
    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.failureThreshold {
            cb.state = "open"
        }
        return err
    }
    cb.failures = 0
    cb.state = "closed"
    return nil
}
```

### Dead Letter Queue Pattern
```sql
-- Move permanently failed jobs
UPDATE job_states
SET status = 'dead_letter',
    updated_at = now()
WHERE status = 'failed'
  AND attempts >= max_attempts;
```

### Retryable Error Classification
```go
func isRetryable(err error) bool {
    var httpErr *HTTPError
    if errors.As(err, &httpErr) {
        return httpErr.StatusCode >= 500 || httpErr.StatusCode == 429
    }
    return errors.Is(err, context.DeadlineExceeded) ||
           errors.Is(err, io.ErrUnexpectedEOF)
}
```

### Timeout Hierarchy
```
API Gateway:    30s (outermost)
Service call:   10s
Database query:  5s
External API:   15s (generous for third-party)
```

## Anti-Patterns

- **Retry everything**: Retrying client errors (4xx) that will never succeed
- **Fixed-interval retries**: Retrying every 1 second — creates thundering herd
- **Infinite retries**: No max attempt limit — jobs stuck in retry loop forever
- **No timeout**: Waiting indefinitely for a response
- **Silent failures**: Swallowing errors without logging or metrics
- **Cascading retries**: Service A retries → Service B retries → exponential amplification
- **Retry without idempotency**: Retrying operations that aren't safe to re-execute
- **Missing dead letter**: Failed jobs disappear with no way to inspect or reprocess

## Checklist

- [ ] Every external call has an explicit timeout
- [ ] Retry logic uses exponential backoff with jitter
- [ ] Max retry attempts are defined
- [ ] Retryable vs non-retryable errors are classified
- [ ] Circuit breaker protects against cascading failures
- [ ] Dead letter queue exists for permanent failures
- [ ] Failure metrics are tracked (error rate, retry rate)
- [ ] Partial batch failures don't block the full batch
- [ ] Retried operations are idempotent
