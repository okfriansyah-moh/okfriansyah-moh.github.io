---
name: system-design-writing
description: "Write technical system design documentation. Use when creating architecture documents, system breakdowns, or engineering articles that follow the standard structure: Problem, System Requirements, Architecture, Implementation, Failure Modes, Lessons Learned."
---

# System Design Writing

## When to Use

- Writing system architecture documentation
- Creating engineering blog posts about systems
- Documenting design decisions and trade-offs
- Producing content for the knowledge hub

## Rules

1. Every system doc follows the standard structure: Problem → System Requirements → Architecture → Implementation → Failure Modes → Lessons Learned
2. Every doc includes YAML frontmatter with title, description, tags, keywords
3. Every doc includes internal links to related concepts and systems
4. Architecture sections must include a Mermaid diagram
5. Trade-offs must be explicit — never present a design as having no downsides
6. Failure modes must be specific and actionable, not generic
7. Write for engineers, not beginners — assume distributed systems literacy

## Patterns

### Standard Article Structure
```markdown
---
title: "System Name"
description: "One-line system description"
tags: [relevant, tags]
keywords: [seo, keywords]
---

# System Name

## Problem
What problem does this system solve? Why does it exist?

## System Requirements
Functional and non-functional requirements. Constraints.

## Architecture
High-level design. Component breakdown. Mermaid diagram.

## Implementation
Key implementation details. Technology choices and why.

## Failure Modes
What can go wrong. How the system handles it. Recovery paths.

## Lessons Learned
What worked. What didn't. What you'd change.
```

### Internal Linking
```markdown
This system uses [deterministic pipelines](/docs/concepts/deterministic-ai-pipelines)
for reliable execution.

Orchestration follows the [orchestrator pattern](/docs/concepts/ai-orchestration-patterns).
```

### Mermaid Diagram
```markdown
```mermaid
graph TD
    A[Scheduler] --> B[Orchestrator]
    B --> C[Worker 1]
    B --> D[Worker 2]
    B --> E[State Machine]
    E --> F[(Database)]
```​
```

### Frontmatter Template
```yaml
title: "Descriptive System Title"
description: "Clear one-line description with key technical terms"
tags:
  - ai systems
  - distributed systems
keywords:
  - specific technical keyword
  - another keyword for discoverability
```

## Anti-Patterns

- **No problem statement**: Jumping straight to architecture without context
- **Missing trade-offs**: Presenting design as perfect with no downsides
- **Generic failure modes**: "The system might fail" instead of specific scenarios
- **No internal links**: Isolated content that doesn't connect to the knowledge graph
- **Missing frontmatter**: Content without structured metadata
- **Tutorial tone**: Writing for beginners instead of engineers
- **Hype language**: "Revolutionary AI system" instead of concrete technical description

## Checklist

- [ ] Standard article structure followed
- [ ] YAML frontmatter complete (title, description, tags, keywords)
- [ ] Architecture section includes Mermaid diagram
- [ ] Trade-offs explicitly documented
- [ ] Failure modes are specific and actionable
- [ ] Internal links to related concepts/systems included
- [ ] Written at engineer level, no filler or hype
- [ ] Lessons learned section has real insights
