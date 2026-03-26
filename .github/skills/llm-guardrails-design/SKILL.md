---
name: llm-guardrails-design
description: "Design LLM guardrails and constraint systems for production AI. Use when implementing input validation, output constraints, fallback strategies, or safety boundaries for LLM-powered features."
---

# LLM Guardrails Design

## When to Use

- Designing input validation for LLM calls
- Implementing output constraint and validation layers
- Building fallback strategies for LLM failures
- Defining safety boundaries for autonomous LLM-powered systems

## Rules

1. Every LLM call must have input validation before sending
2. Every LLM response must be validated against an expected schema before use
3. Fallback behavior must be defined for every LLM integration point
4. Token budgets must be explicit and enforced
5. Sensitive data must be stripped from prompts
6. LLM outputs must never be directly executed as code without sandboxing
7. Rate limiting must be applied to all LLM API calls

## Patterns

### Input Validation Layer
```python
def validate_input(prompt: str) -> str:
    assert len(prompt) <= MAX_TOKENS
    prompt = strip_sensitive_data(prompt)
    prompt = enforce_template(prompt)
    return prompt
```

### Output Schema Validation
```python
def validate_output(response: str, schema: Schema) -> Result:
    parsed = parse_response(response)
    if not schema.validate(parsed):
        return fallback_result()
    return parsed
```

### Retry with Degradation
```
Attempt 1: Full prompt → validate response
Attempt 2: Simplified prompt → validate response
Attempt 3: Fallback to cached/default response
```

### Circuit Breaker
```python
if error_rate > THRESHOLD:
    return cached_fallback()
# Else proceed with LLM call
```

## Anti-Patterns

- **Unvalidated outputs**: Using LLM responses directly without schema check
- **No fallback**: System crashes when LLM returns unexpected output
- **Prompt injection vulnerability**: User input embedded in prompts without sanitization
- **Unbounded token usage**: No limits on prompt or response size
- **Direct code execution**: Running LLM-generated code without sandboxing
- **No rate limiting**: Allowing unbounded API calls

## Checklist

- [ ] Input validation before every LLM call
- [ ] Output schema validation after every LLM response
- [ ] Fallback behavior defined for all LLM integration points
- [ ] Token budgets enforced
- [ ] Sensitive data stripped from prompts
- [ ] Rate limiting applied
- [ ] No direct execution of LLM-generated code
- [ ] Circuit breaker for high error rates
