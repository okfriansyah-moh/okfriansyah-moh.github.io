---
name: modular-monolith
description: "Design modular monolith architectures. Use when structuring applications with clear module boundaries, avoiding premature microservice decomposition, or enforcing separation of concerns within a single deployable unit."
---

# Modular Monolith

## When to Use

- Structuring a new application that doesn't need distributed deployment
- Refactoring a tangled codebase into clear bounded contexts
- Deciding whether to use microservices or keep a single deployable
- Enforcing module boundaries and dependency direction in a monolith

## Rules

1. Each module owns its domain, data, and API surface — no reaching into another module's internals
2. Inter-module communication uses explicit interfaces (function calls, events) — not shared database tables
3. Each module has its own database schema or schema namespace — no cross-module joins
4. Dependencies flow inward — domain logic never depends on infrastructure
5. Modules can be extracted to services later without rewriting business logic
6. Shared code lives in a `shared/` or `common/` package with zero domain logic
7. Module boundaries align with business domains, not technical layers
8. No circular dependencies between modules — enforce with build tooling

## Patterns

### Module Structure
```
app/
├── modules/
│   ├── payment/
│   │   ├── api.go          # Public interface
│   │   ├── service.go      # Business logic
│   │   ├── repository.go   # Data access
│   │   ├── models.go       # Domain models
│   │   └── events.go       # Domain events
│   ├── billing/
│   │   ├── api.go
│   │   ├── service.go
│   │   └── ...
│   └── notification/
│       └── ...
├── shared/
│   ├── database.go
│   ├── logger.go
│   └── http.go
└── main.go
```

### Module Public API
```go
// payment/api.go — the ONLY exported interface
type PaymentService interface {
    ProcessPayment(ctx context.Context, req PaymentRequest) (PaymentResult, error)
    GetPaymentStatus(ctx context.Context, id string) (PaymentStatus, error)
}
```

### Inter-Module Communication via Events
```go
// payment/events.go
type PaymentCompletedEvent struct {
    PaymentID string
    Amount    int64
    Timestamp time.Time
}

// billing/service.go — subscribes, never imports payment internals
func (s *BillingService) OnPaymentCompleted(event PaymentCompletedEvent) error {
    return s.createInvoice(event.PaymentID, event.Amount)
}
```

### Schema Isolation
```sql
-- Each module owns its schema
CREATE SCHEMA payment;
CREATE TABLE payment.transactions (...);

CREATE SCHEMA billing;
CREATE TABLE billing.invoices (...);

-- NO cross-schema joins in application code
```

## Anti-Patterns

- **Shared database tables**: Two modules reading/writing the same table
- **Premature microservices**: Splitting into services before understanding domain boundaries
- **Technical layer separation**: Organizing by controllers/services/repos instead of by domain
- **Circular module dependencies**: Module A imports Module B which imports Module A
- **God module**: One module that knows about everything else
- **Shared domain models**: Using the same struct across module boundaries instead of mapping
- **Direct database access**: One module querying another module's tables directly

## Checklist

- [ ] Each module has a defined public API (interface/contract)
- [ ] No cross-module database access
- [ ] Dependencies between modules are one-directional
- [ ] Shared code contains zero business logic
- [ ] Module boundaries map to business domains
- [ ] Cross-module communication uses events or explicit API calls
- [ ] Modules can be tested in isolation
- [ ] No circular dependencies (enforced by tooling if possible)
