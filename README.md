# AI Systems Engineering Knowledge Hub

Public engineering knowledge base by **Muhammad Okfriansyah** — documenting the architecture, patterns, and trade-offs behind autonomous AI systems built for production.

**Site:** [okfriansyah-moh.github.io](https://okfriansyah-moh.github.io)

## What This Is

A structured technical knowledge hub covering real systems I design and build. Not a blog. Not a portfolio. An engineering record of systems thinking applied to AI and distributed software.

## Systems Covered

- **MD-AME** — Autonomous YouTube production engine using deterministic pipelines and database-backed state machines
- **Polymarket Trading Agent** — Autonomous prediction market agent with signal processing and risk management

## Focus Areas

- **Deterministic AI Pipelines** — Reliable, repeatable AI workflows using idempotent workers
- **Autonomous Systems** — Self-running production systems that operate without human intervention
- **Distributed Backend Architecture** — Scalable systems for data-intensive AI applications
- **AI Orchestration & Reliability** — Production-grade coordination of AI workers and models
- **LLM Guardrails** — Engineering constraints for LLM behavior in production

## Architecture

```
docs/
  systems/     → Full system architecture breakdowns
  concepts/    → Reusable engineering patterns
  projects/    → Implementation references + repos
blog/          → Narrative writing and engineering insights
src/pages/     → Homepage + About
```

Content model:
- **Blog** → narrative insights and lessons learned
- **Systems** → complete architecture breakdowns
- **Concepts** → reusable engineering patterns
- **Projects** → implementations with links to source

## Stack

Built with [Docusaurus](https://docusaurus.io/), deployed on GitHub Pages.

## Development

```bash
npm install
npm start
```
