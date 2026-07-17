# GitHub Knowledge Automation — Content Policy

This file defines durable editorial and security rules for the daily engineering
knowledge automation. The automation agent must read this file at the start of
every run.

## Purpose

Transform **meaningful** engineering work from Muhammad Okfriansyah's public
GitHub repositories into accurate, beginner-friendly documentation. Do **not**
create one article per commit or per pull request.

## Source Allowlist

Only inspect repositories that satisfy **all** of the following:

| Rule | Value |
|------|-------|
| Owner | `okfriansyah-moh` |
| Visibility | public |
| Archived | no |
| Fork | no |

### Explicit Exclusions

Never inspect, quote, summarize, or expose:

- Mekari repositories
- Private or company repositories
- Client repositories
- Tutorial exercises
- Generated repositories
- This documentation repository (`okfriansyah-moh/okfriansyah-moh.github.io`)

## Significance Scoring

Score each candidate activity:

| Signal | Points |
|--------|--------|
| New product capability or substantial feature | +3 |
| Major architectural change | +3 |
| Reliability, consistency, security, or data-integrity mechanism | +3 |
| New orchestration, state-machine, caching, concurrency, or retry pattern | +2 |
| Important performance or scalability improvement | +2 |
| Significant data model change | +2 |
| Meaningful testing or observability improvement | +1 |
| Deployment or operational improvement | +1 |
| Dependency-only, formatting, generated, or administrative change | −3 |
| Change cannot be explained accurately from available evidence | −2 |

**Publish threshold:** score ≥ 3.

**Per-run cap:** maximum 2 new or substantially updated articles.

## Ignore List

Always skip:

- Dependency-only updates
- Lockfile-only changes
- Formatting-only changes
- Renaming without architectural impact
- Generated files
- Temporary debug commits
- Merge commits without meaningful implementation changes
- Minor typo fixes
- Repeated work already documented
- Work with insufficient evidence

## Activity Priority

Process in this order:

1. Merged pull requests
2. New releases
3. Significant commits on default branch without a pull request
4. Newly created public repositories

## Content Placement

| Directory | Use for |
|-----------|---------|
| `docs/systems/` | Full architecture of substantial systems |
| `docs/concepts/` | Reusable engineering patterns |
| `docs/projects/` | Project overviews and evolution |
| `blog/` | Narrative lessons, experiments, retrospectives |

Prefer updating an existing article over creating a duplicate. Update
`sidebars.ts` whenever a new docs page is added.

## Safe Change Scope

The portfolio UI (homepage, navbar, footer, article shell, CSS, theme swizzles)
is **out of scope** for the daily automation. Only modify content and indexing
files listed below.

### Allowed paths

| Path | Purpose |
|------|---------|
| `docs/**`, `blog/**` | Article content |
| `sidebars.ts` | Register new doc ids in existing categories |
| `.automation/topic-index.json` | Topic → document mapping |
| `.automation/github-docs-state.json` | Processed-activity ledger |
| `src/data/content-feed.meta.json` | Optional feed metadata |
| `docs/CONTENT_BACKLOG.md` | Backlog status |

### Forbidden paths

Do not modify: `src/pages/**`, `src/components/**`, `src/theme/**`,
`src/css/**`, `src/lib/**`, `docusaurus.config.ts`, `static/**`,
`package.json`, `src/data/content-feed.ts`, `src/data/nav-links.ts`,
`src/data/learning-paths.json`, or any `.github/**` workflow.

## Feed Integration

Homepage and `/articles` read from `src/data/content-feed.meta.json`. The
prebuild script `scripts/sync-content-feed.mjs` automatically:

- Adds feed entries for documents listed in `topic-index.json`
- Computes `readingTime` from article word count
- Prunes stale entries when doc files are removed

Run `npm run sync:feed` after adding a topic-index entry. Do not hand-edit
`src/data/content-feed.ts` or homepage React components.

## Article Classification

Placement in `docs/systems|concepts|projects/` determines feed `type` and default
difficulty badge. Optional frontmatter `difficulty: Beginner | Intermediate | Advanced`
overrides the default on the article page header.

## Evidence Rules

Never invent metrics, user counts, performance improvements, revenue, benchmarks,
production adoption, or architecture components not present in source repositories.

Every article must cite exact source repositories, pull requests, and commits.

## Validation Gate

Before opening a pull request, run:

1. `npm ci`
2. `npm run typecheck`
3. `npm run build`

Confirm internal links resolve and no private information is present. Maximum 2
repair attempts. Do not open a pull request if validation still fails.

## Pull Request Policy

- Branch: `automation/github-knowledge-YYYY-MM-DD`
- Title: `docs: publish engineering knowledge update YYYY-MM-DD`
- Maximum 1 pull request per run
- Never push directly to `main`
- Never merge the pull request

## Operational Limits

| Setting | Value |
|---------|-------|
| Schedule | Daily 09:00 GMT+7 |
| Maximum source activities inspected | 50 |
| Maximum new/updated articles | 2 |
| Maximum pull requests | 1 |
| First-run history window | 14 days |
| Repair attempts | 2 |
| Direct merge | Disabled |
