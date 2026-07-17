# Muhammad Okfriansyah — Engineering Portfolio & Knowledge Hub

Public engineering site by **Muhammad Okfriansyah** (opi): production software, open source, and architecture writing from real systems work.

**Live site:** [okfriansyah-moh.github.io](https://okfriansyah-moh.github.io)

## What This Is

A Docusaurus site that combines an **engineering portfolio** with a **technical knowledge hub**. The homepage surfaces projects, articles, learning paths, and open-source work. Every doc under `/docs` uses a shared, centered article framework with table of contents, article metadata, and related reading.

Not just a blog — a structured record of systems, patterns, and trade-offs from production engineering.

## Site Features

- **Portfolio homepage** — hero, currently building, featured article, recent articles, learning paths, case studies, open source
- **Hub pages** — `/articles`, `/projects`, `/case-studies`, `/learning-paths`, `/open-source`, `/about`
- **Article framework** — all `/docs/*` pages get centered 3-column layout (TOC · content · article info), article header, difficulty badges, and related articles automatically
- **Light & dark mode** — Inter typography, blue accent palette, responsive from mobile to 4K
- **Local search** — full-text search across docs, blog, and pages
- **Mermaid diagrams** — flowcharts and architecture diagrams in articles
- **Content feed sync** — homepage and hub listings stay in sync with `topic-index` via prebuild script

## Content Model

| Location | Purpose |
|----------|---------|
| `docs/systems/` | Full system architecture breakdowns |
| `docs/concepts/` | Reusable engineering patterns |
| `docs/projects/` | Project overviews and repo links |
| `blog/` | Narratives and engineering notes |
| `src/pages/` | Custom React pages (homepage, hubs, about) |

**Content types** map to feed metadata: `system`, `concept`, `project`, `blog`.

### Systems & Topics Covered

- **Shorts Generator** — Restartable long-video processing pipeline with SQLite checkpointing
- **MD-AME** — Autonomous media engine with deterministic pipelines and state machines
- **Polymarket Trading Agent** — Prediction market agent with signal processing and risk gates
- **A2A Brainstormer** — Section-sequential document generation with coherence audits
- **Skeleton Parallel** — Deterministic agentic coding orchestrator

### Focus Areas

- Deterministic AI pipelines and idempotent workers
- Autonomous production systems
- Distributed backend architecture
- AI orchestration, guardrails, and document coherence
- Payments, fintech, and reliability at scale

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Docusaurus 3](https://docusaurus.io/) + React 19 |
| Styling | Tailwind CSS + custom design tokens (`src/css/custom.css`) |
| Search | `@easyops-cn/docusaurus-search-local` |
| Diagrams | `@docusaurus/theme-mermaid` |
| Language | TypeScript |
| Deploy | GitHub Actions → GitHub Pages |

## Project Structure

```
docs/                          # Markdown articles (systems, concepts, projects)
blog/                          # Blog posts
src/
  components/
    doc/                       # Article framework (header, sidebar, layout shell)
    home/                      # Homepage sections
    ui/                        # Shared UI (SectionHeading, BackToTop)
  data/
    content-feed.meta.json     # Feed items (synced from topic-index)
    contact-links.ts           # Footer & About social/contact links
    learning-paths.json        # Learning path cards
    projects-building.json     # Currently building section
    open-source.json           # Open source grid
  lib/content.ts               # Thumbnails, difficulty, related articles helpers
  pages/                       # Custom pages (index, articles, about, …)
  theme/                       # Docusaurus swizzles
    DocItem/Layout/            # Delegates to ArticleLayoutShell
    DocRoot/Layout/            # Full-width docs shell (no default sidebar)
    Navbar/Content/            # Custom navbar (opi mark, search, theme toggle)
    article-layout/constants.ts
scripts/
  sync-content-feed.mjs        # Prebuild feed sync from topic-index
  generate-favicons.py         # Regenerate opi favicon assets
.automation/                   # Cursor automation policy & topic index
.github/workflows/deploy.yml   # CI deploy on push to main
static/img/                    # Illustrations, thumbnails, favicons
```

## Article Framework

All current and future docs under `/docs/**` automatically receive:

1. **Centered layout** — no reserved Docusaurus sidebar column; content centered on wide screens
2. **Article header** — title, description, reading time, difficulty, tags, thumbnail
3. **Left rail** — collapsible “On this page” TOC + GitHub star + share
4. **Right rail** — article info + related articles
5. **Mobile** — labeled table-of-contents trigger, back-to-top button, compact thumbnails

Implementation lives in `src/components/doc/ArticleLayoutShell.tsx` and `src/theme/DocItem/Layout/`.

## Development

**Requirements:** Node.js ≥ 20

```bash
npm ci
npm start          # dev server at http://localhost:3000 (runs feed sync first)
npm run build      # production build
npm run serve      # preview production build
npm run typecheck  # TypeScript check
```

### Adding Content

1. **New doc article** — add markdown under `docs/`, register in `sidebars.ts`, add entry to `.automation/topic-index.json` (feed sync picks it up on build)
2. **Homepage visibility** — `scripts/sync-content-feed.mjs` merges topic-index into `src/data/content-feed.meta.json` at build time
3. **Article frontmatter** (optional) — `description`, `difficulty`, `tags`, `featured`, `type`, `repo`, `tech`

### Regenerating Favicons

```bash
python3 scripts/generate-favicons.py
```

Outputs `opi` mark assets to `static/img/` (SVG, PNG, ICO).

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run build` (includes `sync:feed`)
3. Deploy `build/` to GitHub Pages

## Automation

This repo supports a Cursor Automation that publishes documentation from public GitHub activity. See `AGENTS.md` and `.automation/content-policy.md` for editorial rules, scoring, and agent instructions.

## Contact

- **GitHub:** [okfriansyah-moh](https://github.com/okfriansyah-moh)
- **LinkedIn:** [Muhammad Okfriansyah](https://www.linkedin.com/in/muhammad-okfriansyah-74092671)
- **Cursor:** [@okfriansyah-moh](https://cursor.com/@okfriansyah-moh)
- **Udemy:** [muhammad-okfriansyah](https://www.udemy.com/user/muhammad-okfriansyah/)
- **Email:** okfriansyah@gmail.com

## License

Content © Muhammad Okfriansyah. Site built with Docusaurus.
