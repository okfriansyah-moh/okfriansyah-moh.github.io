# Engineering Knowledge Hub — Agent Instructions

This repository is maintained by a Cursor Automation that publishes
beginner-friendly engineering documentation derived from public GitHub activity.

## Primary Write Repository

- **Repository:** `okfriansyah-moh/okfriansyah-moh.github.io`
- **Branch:** `main` (read-only for automation — never push directly)
- All content changes go through a single pull request per run

## Automation Control Files

| File | Purpose |
|------|---------|
| `.automation/github-docs-state.json` | Idempotency and processed-activity ledger |
| `.automation/topic-index.json` | Maps engineering topics to existing articles |
| `.automation/content-policy.md` | Editorial rules, scoring, and security boundaries |
| `.automation/article-template.md` | Required article structure for new pages |

## Bootstrap Sequence

Before activating the daily automation:

1. Run a **manual** agent to create `docs/CONTENT_BACKLOG.md` with the 15
   strongest article opportunities (do not write all articles yet).
2. Implement only the top **3 P0** articles, validate the build, and open one
   pull request.
3. After that PR is reviewed and merged, activate the recurring automation.
4. Run the automation **manually three times** before switching from Inactive to
   Active.

## Daily Automation Behavior

See `.automation/content-policy.md` for the full policy. Summary:

- Discover public GitHub activity for owner `okfriansyah-moh` via GitHub MCP
- Filter low-value and already-processed activity
- Score candidates; document only those scoring ≥ 3
- Update existing articles or create at most 2 per run
- Validate with `npm ci`, `npm run typecheck`, `npm run build`
- Open one PR on branch `automation/github-knowledge-YYYY-MM-DD`

## Content Types

- `docs/systems/` — substantial system architectures
- `docs/concepts/` — reusable patterns
- `docs/projects/` — project overviews and journeys
- `blog/` — narratives and retrospectives

Update `sidebars.ts` when adding new docs pages.

## Known Article Candidates

Initial high-signal topics (see `topic-index.json`):

| Topic | Proposed focus |
|-------|----------------|
| Shorts Generator | Restartable long-video processing pipeline |
| A2A Brainstormer | Preventing contradictions in AI-generated documents |
| Skeleton Parallel | Deterministic agentic coding orchestrator |
| ARES | Provider-neutral AI repository standards |
