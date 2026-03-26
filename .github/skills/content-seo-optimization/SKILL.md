---
name: content-seo-optimization
description: "Optimize content for search engines and LLM discoverability. Use when writing metadata, structuring frontmatter, building internal link graphs, or ensuring content is discoverable by AI search tools like Perplexity and ChatGPT browsing."
---

# Content & SEO Optimization

## When to Use

- Writing or reviewing YAML frontmatter metadata
- Optimizing content for search engine indexing
- Improving discoverability by LLM retrieval systems
- Building internal link graphs between content
- Reviewing content structure for SEO signals

## Rules

1. Every doc must have complete YAML frontmatter: title, description, tags, keywords
2. Title must be descriptive and keyword-rich (not generic labels)
3. Description must be a complete sentence with key technical terms
4. Tags are broad categories; keywords are specific search terms
5. Internal links create semantic relationships — every doc must link to at least 2 related docs
6. Headings must use clear, descriptive phrases (H2 for major sections, H3 for subsections)
7. First paragraph must clearly state what the page covers (LLMs index this heavily)

## Patterns

### Frontmatter Template
```yaml
title: "Deterministic AI Pipelines"
description: "Reliable AI pipeline architecture using idempotent workers and database-backed state machines for production systems."
tags:
  - ai systems
  - distributed systems
  - pipeline architecture
keywords:
  - ai pipeline architecture
  - deterministic execution
  - idempotent workers
  - database state machine
```

### Internal Link Graph
```markdown
This system uses [deterministic pipelines](/docs/concepts/deterministic-ai-pipelines)...
The orchestrator follows [standard coordination patterns](/docs/concepts/ai-orchestration-patterns)...
See the [MD-AME project](/docs/projects/md-ame) for implementation details.
```

### Heading Structure
```markdown
# Page Title (H1 — one per page)
## Problem (H2 — major sections)
## Architecture (H2)
### Component A (H3 — subsections)
### Component B (H3)
```

## Anti-Patterns

- **Generic titles**: "Pipelines" instead of "Deterministic AI Pipelines"
- **Missing description**: Empty or placeholder description field
- **No internal links**: Orphaned content with no connections
- **Keyword stuffing**: Repeating terms unnaturally in body text
- **Missing first paragraph context**: Starting with code instead of explanation
- **Flat heading structure**: Using only H1 and H2 without H3 hierarchy

## Checklist

- [ ] Title is keyword-rich and descriptive
- [ ] Description is a complete sentence with technical terms
- [ ] Tags cover broad categories (3-5)
- [ ] Keywords include specific search terms (3-6)
- [ ] At least 2 internal links to related content
- [ ] First paragraph clearly states page purpose
- [ ] Headings are descriptive and hierarchical
- [ ] No orphaned content — connected to the knowledge graph
