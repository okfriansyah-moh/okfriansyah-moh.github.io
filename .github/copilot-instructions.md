# Project Guidelines

## Architecture

This is an AI Systems Engineering Knowledge Hub built with Docusaurus. The site architecture is LOCKED:

- **Blog** → Narrative writing, engineering insights, lessons learned
- **Systems** (`docs/systems/`) → Full system architecture breakdowns
- **Concepts** (`docs/concepts/`) → Reusable engineering patterns
- **Projects** (`docs/projects/`) → Implementation references with repo links
- **About** (`src/pages/about.md`) → Professional profile

## Engineering Principles

### Deterministic Systems Only
- All system designs must favor deterministic execution over non-deterministic agent behavior
- Prefer orchestrator pattern over autonomous agent chaos
- Every pipeline must be reproducible given the same inputs

### Idempotent Operations Required
- All workers and pipeline stages must be idempotent
- Re-running any stage with the same input must produce the same output
- No side effects that compound on retry

### Database-Backed State Preferred
- Use database state machines as the single source of truth for workflow progress
- No in-memory-only state for critical workflows
- State transitions must be atomic and auditable

### No Unnecessary Abstraction
- Do not introduce abstraction layers unless they serve multiple consumers
- No microservices unless justified by independent scaling or deployment needs
- Prefer simple, direct implementations over framework-heavy solutions

### Avoid Agent Chaos
- Do not design systems where autonomous agents make unbounded decisions
- Constrain decision spaces explicitly
- Every automated action must have defined boundaries and rollback paths

## File Duplication Prevention

### MUST NOT
- Create duplicate files with similar names (e.g., `utils.ts` and `helpers.ts` with overlapping functions)
- Create new utility modules when existing ones already cover the functionality
- Duplicate component definitions — each component lives in `src/components/` and is defined exactly once
- Duplicate doc content across `docs/systems/`, `docs/concepts/`, and `docs/projects/` — each topic has one canonical page
- Duplicate configuration across `docusaurus.config.ts` and `sidebars.ts` — each config concern has one location
- Create wrapper modules that simply re-export another module's functions

### MUST
- Check existing files before creating new ones — use the project structure as the source of truth
- Reuse existing components from `src/components/` and shared modules
- Place new code in the correct existing module rather than creating a parallel file
- When adding a new doc, verify no existing doc already covers that topic
- Keep one canonical location for each piece of logic — no copies, no forks, no alternatives

## Code Style

- TypeScript for site code (Docusaurus config, components)
- Markdown for all content (docs, blog posts)
- YAML frontmatter required on all docs with: title, description, tags, keywords

## Content Standards

Every technical article follows this structure:
1. Problem
2. System Requirements
3. Architecture
4. Implementation
5. Failure Modes
6. Lessons Learned

Every doc must include internal links to related concepts and systems.

## Build and Test

```bash
npm install    # Install dependencies
npm start      # Development server
npm run build  # Production build
```
