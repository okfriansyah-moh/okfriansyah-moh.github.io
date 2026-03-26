---
name: ai-systems-thinking
description: "Apply systems engineering discipline to AI-powered products. Use when designing AI features for production, evaluating LLM integration points, choosing between AI and deterministic approaches, or architecting reliable AI-assisted workflows."
---

# AI Systems Thinking

## When to Use

- Deciding whether a feature actually needs AI/LLM
- Designing production AI integrations that must be reliable
- Evaluating trade-offs between AI flexibility and system determinism
- Architecting AI-assisted workflows with graceful degradation
- Reviewing AI system designs for production readiness

## Rules

1. AI is an implementation detail, not an architecture — design the system first, add AI where it adds value
2. Every AI component must have a non-AI fallback or degradation path
3. AI outputs are untrusted inputs — always validate, never execute blindly
4. Prefer deterministic logic for anything that can be solved with rules — reserve AI for genuinely ambiguous tasks
5. Cost of AI calls (latency, tokens, money) must be budgeted and monitored
6. AI model choice is a deployment decision, not an architecture decision — design for model swappability
7. Measure AI component effectiveness with concrete metrics, not vibes
8. AI failures must not cascade — isolate AI components behind circuit breakers
9. Human-in-the-loop must be a design option, not an afterthought

## Patterns

### AI Decision Framework
```
Can this be solved with rules/heuristics?
  → YES: Use deterministic logic. No AI needed.
  → NO: Is the task genuinely ambiguous?
    → YES: Use AI with validation + fallback.
    → NO: Reconsider the problem definition.
```

### AI Component Isolation
```
Request → Preprocessor (deterministic)
        → AI Worker (LLM call, isolated)
        → Validator (schema check)
        → Postprocessor (deterministic)
        → Output
```

### Model Abstraction Layer
```go
type TextGenerator interface {
    Generate(ctx context.Context, prompt string, opts Options) (string, error)
}

// Implementations: OpenAIGenerator, AnthropicGenerator, LocalModelGenerator
// Swap at config level, not code level
```

### Cost Budget Pattern
```python
class AIBudget:
    def __init__(self, max_tokens_per_request: int, max_cost_per_day: float):
        self.max_tokens = max_tokens_per_request
        self.max_daily_cost = max_cost_per_day

    def check(self, estimated_tokens: int) -> bool:
        return (estimated_tokens <= self.max_tokens
                and self.daily_spend() < self.max_daily_cost)
```

### Effectiveness Measurement
```
Track per AI component:
- Accuracy (validated output vs expected)
- Latency (p50, p95, p99)
- Cost per call (tokens × rate)
- Fallback rate (how often AI is bypassed)
- Error rate (validation failures)
```

## Anti-Patterns

- **AI for everything**: Using LLMs for tasks solvable with a regex or lookup table
- **Architecture around the model**: Building the entire system assuming a specific AI model
- **No fallback**: System breaks completely when the AI provider is down
- **Trust by default**: Using AI outputs without validation
- **Unmeasured AI**: Shipping AI features with no accuracy or cost tracking
- **AI as magic**: Treating AI as an infallible oracle instead of a probabilistic tool
- **Vendor lock-in**: Hardcoding a single AI provider into the architecture
- **Ignoring latency**: Designing synchronous flows that depend on slow AI calls

## Checklist

- [ ] AI is used only where deterministic logic cannot solve the problem
- [ ] Every AI component has a fallback/degradation path
- [ ] AI outputs are validated before use
- [ ] Model is swappable without architectural changes
- [ ] Cost and latency budgets are defined and monitored
- [ ] Effectiveness metrics are tracked per AI component
- [ ] AI failures are isolated (circuit breaker pattern)
- [ ] Human-in-the-loop option exists where appropriate
