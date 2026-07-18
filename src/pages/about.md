---
title: About
description: "Muhammad Okfriansyah — AI Systems Architect and Engineering Manager specializing in deterministic pipelines, autonomous systems, and distributed backend architecture."
---

# Muhammad Okfriansyah

**AI Systems Architect · Engineering Manager**

12+ years building backend systems, payment infrastructure, and distributed architectures at scale. Currently Engineering Manager at Mekari, leading core platform and reporting teams. Evolving into AI systems engineering — designing autonomous pipelines, orchestration systems, and production-grade AI workflows grounded in the same reliability discipline that runs fintech.

Not chasing hype. Applying distributed systems experience to make AI systems that actually work.

---

## What I Build

My work sits at the intersection of backend systems engineering and AI architecture:

- **Autonomous AI Systems** — Self-operating production pipelines that run without human intervention, using database-backed state machines for coordination. See [MD-AME](/docs/systems/md-ame-autonomous-media-engine) for a working example.
- **Deterministic Pipelines** — Reproducible AI workflows where every stage is idempotent, every state transition is atomic, and every failure has a recovery path. Covered in [Deterministic AI Pipelines](/docs/concepts/deterministic-ai-pipelines).
- **Distributed Backend Systems** — Scalable service architectures for data-intensive applications — payment processing, banking integrations, and financial reporting at millions of transactions.
- **AI Orchestration** — Central orchestrator patterns over autonomous agent chaos. Constrained decision spaces, explicit boundaries, and rollback paths for every automated action. See [AI Orchestration Patterns](/docs/concepts/ai-orchestration-patterns).

The through-line: I build systems that are reliable first, intelligent second.

---

## Engineering Principles

These are not aspirational. They're the constraints I enforce in every system I design.

- **Deterministic over probabilistic** — Given the same input, produce the same output. Pipelines must be reproducible.
- **Idempotent operations** — Every worker, every stage, every retry produces the same result. No side effects that compound on re-execution.
- **Database-backed state machines** — Database is the single source of truth. No in-memory-only state for anything that matters.
- **Orchestrator over agent chaos** — A central coordinator owns execution flow. Workers are stateless, isolated, and replaceable.
- **Simplicity over overengineering** — No abstraction without three consumers. No microservices without independent scaling needs. The simplest working solution ships first.

---

## Experience

### Mekari — Engineering Manager & Lead Engineer
*2022 – Present · Jakarta*

Leading the Core and Report squads for Mekari Officeless — owning the foundational services, APIs, and data infrastructure that power the platform. Previously led Core Payment and Kredigram teams in the Financial Service Tribe, managing payment processing, KYC, expense management, and banking-as-a-service.

Key outcomes:
- Increased engineering productivity 70% (DORA metrics) — 90% deployment frequency, lead time reduced by 70%
- Raised SLO from 98.7% to 99.9% through integrated product-engineering-business alignment
- Maintained failure rate below 1% and MTTR under 30 minutes using feature toggles and aggressive monitoring
- Reduced infrastructure costs ~40% through strategic cloud migration
- Cut resource consumption 50% by rewriting critical services from Java to Go
- Improved API response times 30% and internal page loads by 4 seconds through query optimization
- Integrated payment gateways (Xendit, Midtrans, Ayoconnect) and H2H banking (BNI, BRI, Permata via SNAP API)

### DOKU — Technical Lead Developer
*2016 – 2022 · Jakarta*

Led the Core Payment Team for Indonesia's leading payment gateway. Owned the design and integration of APIs connecting partners to internet banking, virtual accounts, credit cards, rate management, and bank transfers.

Initiated the technology upgrade for Jokul — DOKU's next-generation payment platform focused on credit card services. Directed the full rewrite of the credit card project: Angular frontend, Spring Boot backend. Achieved 96% code coverage and 8.5/10 code readability score. Migrated monitoring from Sentry to an in-house Grafana stack.

### Earlier Roles
*2013 – 2015 · Jakarta*

ERP systems for Telkomsel (revenue data, POS, sales orders), e-learning platform for Pertamina, and SMS gateway infrastructure for SCTV/Indosiar — building operational systems and automation tooling from early in my career.

---

## Key Achievements

| Metric | Result |
|---|---|
| Engineering productivity (DORA) | **+70%** improvement across deployment frequency, lead time, failure rate |
| Service reliability (SLO) | **98.7% → 99.9%** with MTTR under 30 minutes |
| Infrastructure cost | **~40% reduction** via cloud migration |
| Resource efficiency | **50% reduction** by rewriting services in Go |
| API performance | **30% faster** response times, 4s improvement on internal pages |
| Payment integrations | Multiple gateways + H2H banking across domestic and international |

---

## Technical Focus

- **Backend** — Go, Java, Spring Boot, REST APIs, distributed service design
- **Systems** — Architecture, scalability, reliability engineering, state machine design
- **AI** — Emerging focus: deterministic pipelines, [LLM guardrails](/docs/concepts/llm-guardrails), orchestration patterns, autonomous systems
- **Infrastructure** — PostgreSQL, MySQL, Docker, cloud platforms, Grafana, CI/CD

---

## Current Direction

My career arc is deliberate: backend systems → distributed architecture → payment infrastructure at scale → **AI systems engineering**.

The AI space is full of demos and prototypes. What's missing is the production discipline — the same reliability, idempotency, and state management that makes payment systems work at 99.9% uptime. That's the gap I'm filling.

Current focus:
- Building [autonomous media production systems](/docs/projects/md-ame) using deterministic pipelines
- Designing [AI agent architectures](/docs/projects/polymarket-agent) with constrained decision spaces
- Writing about [system-level patterns](/docs/concepts/deterministic-ai-pipelines) that make AI workflows production-ready

This site is the knowledge hub for that work.

---

## Connect

- [GitHub](https://github.com/okfriansyah-moh)
- [LinkedIn](https://www.linkedin.com/in/muhammad-okfriansyah-74092671)
