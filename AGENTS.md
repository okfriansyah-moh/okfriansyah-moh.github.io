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

- `docs/systems/` — substantial system architectures (type: **system**, difficulty: Advanced)
- `docs/concepts/` — reusable patterns (type: **concept**, difficulty: Intermediate)
- `docs/projects/` — project overviews and journeys (type: **project**, difficulty: Intermediate)
- `blog/` — narratives and retrospectives (type: **blog**, difficulty: Beginner)

All `/docs/*` pages automatically use the shared article layout (TOC + article sidebar). No per-article UI setup is required.

## Publishing New Articles (automation checklist)

1. Write markdown under the correct `docs/` subdirectory (or `blog/`).
2. Add the doc id to `sidebars.ts` in the matching category.
3. Add or update `.automation/topic-index.json` (document path + sources).
4. Optionally add metadata to `src/data/content-feed.meta.json`, or run `npm run sync:feed` to merge from frontmatter.
5. Validate with `npm ci`, `npm run typecheck`, `npm run build`.

Do **not** edit homepage components, theme swizzles, navbar, footer, CSS, or `src/data/content-feed.ts`. The feed sync script keeps the homepage and `/articles` in sync at build time.

See `.automation/content-policy.md` for the full safe-change scope.

## Known Article Candidates

Initial high-signal topics (see `topic-index.json`):

| Topic | Proposed focus |
|-------|----------------|
| Shorts Generator | Restartable long-video processing pipeline |
| A2A Brainstormer | Preventing contradictions in AI-generated documents |
| Skeleton Parallel | Deterministic agentic coding orchestrator |
| ARES | Provider-neutral AI repository standards |
