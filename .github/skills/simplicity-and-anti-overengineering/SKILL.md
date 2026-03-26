---
name: simplicity-and-anti-overengineering
description: "Enforce simplicity and prevent over-engineering. Use when reviewing architecture for unnecessary abstraction, choosing between simple and complex solutions, or resisting premature optimization and framework-heavy designs."
---

# Simplicity and Anti-Overengineering

## When to Use

- Reviewing code or architecture for unnecessary complexity
- Deciding between a simple implementation and a "better" abstraction
- Evaluating whether to introduce a new framework, library, or pattern
- Pushing back on premature optimization or speculative generality
- Designing systems that will be maintained by a small team

## Rules

1. Start with the simplest implementation that works — refactor when complexity is earned
2. Do not introduce abstraction until you have at least 3 concrete use cases
3. Prefer direct function calls over message buses for in-process communication
4. Do not split into microservices unless you have independent scaling or deployment needs
5. Avoid frameworks that impose more structure than the problem requires
6. Every dependency added must justify its weight — prefer standard library when adequate
7. Readability beats cleverness — write code that a new team member understands in 5 minutes
8. Delete code that isn't used — dead code is negative value
9. Premature optimization is only justified by profiling data, not intuition
10. If you're building infrastructure that doesn't directly serve the product, stop and reassess

## Patterns

### YAGNI Decision Framework
```
Is this feature/abstraction needed right now?
  → NO: Don't build it.
Is there a simpler way to achieve the same result?
  → YES: Use the simpler way.
Will this abstraction serve 3+ concrete use cases?
  → NO: Inline the logic.
  → YES: Proceed with the abstraction.
```

### Direct Over Indirect
```go
// SIMPLE: Direct function call
result := processPayment(order)

// OVERENGINEERED: Event bus for in-process communication
eventBus.Publish("order.created", order)
// ... somewhere else, a handler picks it up
```

### Dependency Evaluation
```
Before adding a dependency:
1. Can the standard library do this? → Use it.
2. How many transitive dependencies does it bring? → Keep it small.
3. Is it actively maintained? → Check last commit date.
4. Can I write this in < 100 lines? → Write it yourself.
```

### Complexity Budget
```
Every system has a complexity budget:
- 1 database is simpler than 2
- Monolith is simpler than microservices
- Function call is simpler than HTTP call
- SQL is simpler than ORM for simple queries
- Cron job is simpler than distributed scheduler

Spend complexity only where it buys real value.
```

### Right-Sized Architecture
```
1 developer:   Monolith, single database, cron jobs
2-5 developers: Modular monolith, maybe 1 background worker
5-15 developers: Consider service boundaries where needed
15+ developers: Microservices may become necessary
```

## Anti-Patterns

- **Speculative generality**: Building for imagined future requirements
- **Resume-driven development**: Choosing tech because it looks good, not because it fits
- **Abstraction addiction**: Wrapping everything in interfaces and factories
- **Config-driven complexity**: Making everything configurable when only one value is ever used
- **Pattern tourism**: Applying every GoF pattern regardless of need
- **Microservices by default**: Splitting a 3-person team's work into 10 services
- **Framework worship**: Using a heavy framework for a problem that needs 50 lines of code
- **Wrapper modules**: Creating modules that just re-export another module's functions
- **Premature optimization**: Caching, sharding, or parallelizing before proving it's needed

## Checklist

- [ ] Implementation uses the simplest approach that meets current requirements
- [ ] No abstractions without 3+ concrete consumers
- [ ] No dead code or unused dependencies
- [ ] New dependencies justified (can't use standard library?)
- [ ] Architecture complexity matches team size and problem scope
- [ ] No speculative features built for hypothetical future needs
- [ ] Code is readable by someone unfamiliar with the codebase
- [ ] No premature optimization without profiling evidence
