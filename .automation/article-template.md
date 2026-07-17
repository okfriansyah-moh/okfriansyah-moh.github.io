---
title: "<Article Title>"
description: "<One-sentence description for SEO, feed cards, and article header>"
sidebar_position: <number>
tags:
  - <tag-1>
  - <tag-2>
keywords:
  - <keyword-1>
  - <keyword-2>
difficulty: <Beginner|Intermediate|Advanced> # optional; inferred from docs/ path if omitted
---

# <Article Title>

<!-- Frontmatter notes for automation:
  - title + description are required and feed the homepage /articles cards.
  - Place the English file under docs/systems/, docs/concepts/, or docs/projects/ (or blog/).
  - Register the doc id (no extension) in sidebars.ts and topic-index.json.
  - **Also write the Indonesian mirror** at:
    i18n/id/docusaurus-plugin-content-docs/current/{same-relative-path}.md
  - Article layout (TOC, sidebar, related links) is applied automatically — no extra setup.
-->

## What Was Built

<!-- Concrete summary of the engineering change. -->

## The Problem

<!-- What problem does this solve? Why is the obvious solution insufficient? -->

## Why This Problem Is Difficult

<!-- Constraints, scale, failure modes, or domain complexity. -->

## Beginner Mental Model

<!-- Plain-language analogy or step-by-step mental picture before architecture. -->

## Requirements and Constraints

<!-- Functional and non-functional requirements evidenced in source code. -->

## Architecture Overview

<!-- High-level component diagram description. -->

```mermaid
flowchart TD
  A[Client / Trigger] --> B[Component]
  B --> C[Store / Queue]
  C --> D[Worker]
```

## Execution Flow

1. <!-- Step 1 -->
2. <!-- Step 2 -->
3. <!-- Step 3 -->

## Important Components

| Component     | Responsibility |
| ------------- | -------------- |
| <!-- name --> | <!-- role -->  |

## Simplified Implementation Examples

<!-- Mark as simplified when not copied exactly from source. -->

```typescript
// simplified example
```

## Reliability and Idempotency

<!-- Where is state stored? What happens on retry? -->

## Failure Modes

<!-- What breaks, how it is detected, and what recovery looks like. -->

## Trade-offs and Rejected Alternatives

<!-- Design decisions with evidence from PRs or code. -->

## Testing

<!-- How correctness is verified. -->

## Operations and Observability

<!-- How to run, monitor, and debug. -->

## Lessons Learned

<!-- Durable engineering takeaways. -->

## Sources

- Repository: `okfriansyah-moh/<repo>`
- Pull request(s): <!-- links -->
- Commit(s): <!-- SHAs -->
