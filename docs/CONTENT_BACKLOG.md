# Engineering Knowledge Backlog

Generated during the automation bootstrap pass on **2026-07-16**. Updated **2026-07-18**
after strengthening all stub articles to full template depth.

This backlog ranks article opportunities discovered from public repositories owned by
`okfriansyah-moh`. The daily automation should consult this file when deciding whether
to update an existing page or create a new one.

## Status Summary (2026-07-21)

| Status | Count | Notes |
|--------|------:|-------|
| Complete (full template) | 14 | All EN + ID mirrors |
| Stubs remaining | 0 | — |
| Missing pages | 0 | Delivery Foundry system + project pages added |

**Completed in 2026-07-21 automation run:** Delivery Foundry control plane system article, Delivery Foundry project overview (new public repo `the-foundry`).

## Priority Legend

| Priority | Meaning |
|----------|---------|
| **P0** | High-signal, strong evidence, fills a major content gap — implement first |
| **P1** | Strong topic, can follow after P0 pages are stable |
| **P2** | Valuable but lower urgency or thinner source evidence |

---

## P0 — Implement First

### 1. Building a Restartable Long-Video Processing Pipeline

| Field | Value |
|-------|-------|
| **Type** | System |
| **Proposed title** | Building a Restartable Long-Video Processing Pipeline |
| **Target path** | `docs/systems/shorts-generator-pipeline.md` |
| **Source repo** | [okfriansyah-moh/shorts-generator](https://github.com/okfriansyah-moh/shorts-generator) |
| **Key PRs** | [#8 scheduler mechanism](https://github.com/okfriansyah-moh/shorts-generator/pull/8), [#10 multi-platform publish](https://github.com/okfriansyah-moh/shorts-generator/pull/10), [#11 sports video type](https://github.com/okfriansyah-moh/shorts-generator/pull/11) |
| **Learning objective** | Understand how to design a 16-stage deterministic pipeline with SQLite checkpointing, idempotent stage caching, and distributed upload scheduling |
| **Architecture diagram** | Sequential stage pipeline with orchestrator checkpoint/resume; fan-out publisher threads |
| **Update existing?** | No — new page |
| **Significance** | +3 new capability, +3 architectural change, +3 reliability mechanism |

### 2. How to Prevent Contradictions in AI-Generated Documents

| Field | Value |
|-------|-------|
| **Type** | Concept |
| **Proposed title** | How to Prevent Contradictions in AI-Generated Documents |
| **Target path** | `docs/concepts/ai-document-coherence.md` |
| **Source repo** | [okfriansyah-moh/a2a-brainstormer](https://github.com/okfriansyah-moh/a2a-brainstormer) |
| **Key PRs** | [#12 section-per-section coherence audit](https://github.com/okfriansyah-moh/a2a-brainstormer/pull/12) (open), [#8 output quality](https://github.com/okfriansyah-moh/a2a-brainstormer/pull/8) |
| **Learning objective** | Learn a section-sequential generation + cross-section coherence audit pattern with guarded micro-fixes |
| **Architecture diagram** | Monolithic vs section-sequential paths → coherence pass → guardrail revert |
| **Update existing?** | No — new page |
| **Significance** | +3 reliability/consistency mechanism, +2 orchestration pattern |

### 3. Designing a Deterministic Agentic Coding Orchestrator

| Field | Value |
|-------|-------|
| **Type** | Concept |
| **Proposed title** | Designing a Deterministic Agentic Coding Orchestrator |
| **Target path** | `docs/concepts/deterministic-agentic-orchestrator.md` |
| **Source repo** | [okfriansyah-moh/skeleton-parallel](https://github.com/okfriansyah-moh/skeleton-parallel) |
| **Key PRs** | [#1 Agentic loop migration](https://github.com/okfriansyah-moh/skeleton-parallel/pull/1), [#2 Arch-aware scaffolding](https://github.com/okfriansyah-moh/skeleton-parallel/pull/2) |
| **Learning objective** | Understand task-based agent loops with bounded retries, checkpoint rollback, and quality gates |
| **Architecture diagram** | `skeleton run` task pipeline with agent stages and rollback tags |
| **Update existing?** | Partially overlaps `docs/concepts/ai-orchestration-patterns.md` — new focused page |
| **Significance** | +3 major architectural change, +2 orchestration pattern |

---

## P1 — Next Wave

### 4. Provider-Neutral AI Repository Standards (ARES)

| Field | Value |
|-------|-------|
| **Type** | Project |
| **Proposed title** | Portable AI Coding Knowledge with ARES |
| **Target path** | `docs/projects/ares.md` |
| **Source repo** | [okfriansyah-moh/ares](https://github.com/okfriansyah-moh/ares) |
| **Key PRs** | [#8 Antigravity support](https://github.com/okfriansyah-moh/ares/pull/8), [#7 skills refactor](https://github.com/okfriansyah-moh/ares/pull/7) |
| **Learning objective** | Define portable `.ai/` standards that work across Cursor, Antigravity, and other agents |
| **Architecture diagram** | `.ai/manifest.yaml` → skill import → provider adapters |
| **Update existing?** | No |
| **Significance** | +3 architectural change |

### 5. MD-AME: Dimension-Parameterized Autonomous Media Engine

| Field | Value |
|-------|-------|
| **Type** | System |
| **Proposed title** | MD-AME: Autonomous Media Engine Architecture |
| **Target path** | `docs/systems/md-ame-autonomous-media-engine.md` |
| **Source repo** | [okfriansyah-moh/md-ame](https://github.com/okfriansyah-moh/md-ame) |
| **Key PRs** | TBD — inspect default branch commits |
| **Learning objective** | Crash-safe orchestration with database-backed state machines for media production |
| **Architecture diagram** | Deterministic pipeline + dimension parameters |
| **Update existing?** | **Yes** — replace placeholder at `docs/systems/md-ame-autonomous-media-engine.md` |
| **Significance** | +3 system capability |

### 6. Multi-Platform Short-Form Publishing with Failure Isolation

| Field | Value |
|-------|-------|
| **Type** | Concept |
| **Proposed title** | Fan-Out Publishing with Per-Platform Failure Isolation |
| **Target path** | `docs/concepts/multi-platform-publish-fanout.md` |
| **Source repo** | [okfriansyah-moh/shorts-generator](https://github.com/okfriansyah-moh/shorts-generator) |
| **Key PRs** | [#10](https://github.com/okfriansyah-moh/shorts-generator/pull/10) |
| **Learning objective** | Concurrent platform uploads where one failure does not block others |
| **Architecture diagram** | Upload scheduler → thread-per-platform → aggregate result |
| **Update existing?** | Could extend shorts-generator system page instead |
| **Significance** | +2 reliability pattern |

### 7. Canonical State Pipelines for Multi-Agent Design Sessions

| Field | Value |
|-------|-------|
| **Type** | Concept |
| **Proposed title** | Canonical State in Multi-Agent Design Pipelines |
| **Target path** | Update `docs/concepts/ai-orchestration-patterns.md` |
| **Source repo** | [okfriansyah-moh/a2a-brainstormer](https://github.com/okfriansyah-moh/a2a-brainstormer) |
| **Key PRs** | [#7 e2e MVP](https://github.com/okfriansyah-moh/a2a-brainstormer/pull/7) |
| **Learning objective** | Fixed-role sequential agents passing immutable canonical state |
| **Architecture diagram** | Builder → Reviewer → Refiner → Devil's Advocate loop |
| **Update existing?** | **Yes** |
| **Significance** | +2 orchestration pattern |

### 8. Deterministic Event-Driven Crypto Sniping

| Field | Value |
|-------|-------|
| **Type** | System |
| **Proposed title** | Event-Driven Crypto Sniping Bot Architecture |
| **Target path** | `docs/systems/crypto-sniping-bot.md` |
| **Source repo** | [okfriansyah-moh/crypto-sniping-bot](https://github.com/okfriansyah-moh/crypto-sniping-bot) |
| **Key PRs** | TBD |
| **Learning objective** | Low-latency event processing with deterministic decision rules |
| **Architecture diagram** | Event listener → filter → execution engine |
| **Update existing?** | No |
| **Significance** | +2 performance, +2 data model |

---

## P2 — Later

### 9. Real-Time Adaptive Polymarket Trading Agent

| Type: System | Repo: `edge-polymarket-agent` | Path: update `docs/systems/polymarket-trading-agent.md` |
| Learning: capital protection + real-time control | Diagram: signal → risk gate → execution |

### 10. Multi-Market Quantitative Trading Agent

| Type: Project | Repo: `multi-market-trading-agent` | Path: `docs/projects/multi-market-trading-agent.md` |
| Learning: cross-market signal aggregation | Diagram: market adapters → strategy core |

### 11. The Collective Agent: Bun + ElizaOS Orchestration

| Type: System | Repo: `the-collective-agent` | Path: `docs/systems/the-collective-agent.md` |
| Learning: high-efficiency multi-agent on Bun | Diagram: agent pool + message bus |

### 16. Delivery Foundry: Governed Control Plane (added 2026-07-21)

| Type: System + Project | Repo: `the-foundry` | Path: `docs/systems/delivery-foundry-control-plane.md`, `docs/projects/delivery-foundry.md` |
| Learning: kernel vs PEC authority split, six-status state model, dual-track roadmap | Status: **Complete** |

### 12. Sports Video Compositor Strategies

| Type: Concept | Repo: `shorts-generator` PR #11 | Path: section in shorts-generator page |
| Learning: hybrid action-tracking for broadcast crops | Diagram: face → pose → motion cascade |

### 13. Podcast Speaker Detection via Transcript-Face Alignment

| Type: Concept | Repo: `shorts-generator` PR #7 | Path: section in shorts-generator page |
| Learning: deterministic speaker clustering | Diagram: time buckets → cluster scoring |

### 14. Skeleton Multi-Role Additive Scaffolding

| Type: Concept | Repo: `skeleton-parallel` PR #2 | Path: section in orchestrator page |
| Learning: architecture-aware init without overwriting planned structure | Diagram: layout.yaml role registry |

### 15. LLM Provider Abstraction with Credential Refs

| Type: Concept | Repo: `a2a-brainstormer` PR #10 | Path: `docs/concepts/llm-provider-abstraction.md` |
| Learning: provider-neutral LLM interface with env-only secrets | Diagram: LLMProvider interface → adapters |

---

## Repositories Deliberately Excluded

| Repo | Reason |
|------|--------|
| `okfriansyah-moh.github.io` | Documentation target — not a source |
| `officeless-security-governance` | Likely work-related — verify before documenting |
| `i-learn-ruby`, `udemy-angular-book-apps`, tutorial repos | Learning exercises |
| `cv`, `okfriansyah-moh` (profile) | Non-engineering content |
