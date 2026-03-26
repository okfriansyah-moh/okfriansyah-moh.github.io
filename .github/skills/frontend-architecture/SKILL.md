---
name: frontend-architecture
description: "Design frontend architecture for content-heavy sites. Use when structuring page layouts, organizing components, defining routing patterns, or establishing frontend project conventions for Docusaurus or similar static sites."
---

# Frontend Architecture

## When to Use

- Structuring a new frontend project or section
- Organizing components and page layouts
- Defining routing and navigation patterns
- Establishing conventions for a content-focused site
- Reviewing frontend structure for maintainability

## Rules

1. Frontend is a delivery layer for content — architecture serves readability, not visual complexity
2. Pages map 1:1 to routes — no deep nested routing unless content hierarchy demands it
3. Components are flat — max 2 levels of component nesting for any given page
4. Shared components live in `src/components/` — defined exactly once, reused everywhere
5. Page-specific logic stays in the page file — do not extract until 3+ pages share it
6. CSS is scoped to components — no global styles except theme variables and resets
7. Static data preferred over dynamic fetching for content sites
8. Navigation structure mirrors content architecture — Blog, Systems, Concepts, Projects, About

## Patterns

### Component Organization
```
src/
├── components/
│   ├── Layout/           # Shared layout wrappers
│   ├── Card/             # Reusable card component
│   └── Navigation/       # Custom nav components
├── pages/
│   ├── index.tsx         # Home page
│   └── about.md          # About page
├── css/
│   └── custom.css        # Theme overrides only
└── theme/                # Docusaurus theme overrides (sparse)
```

### Page Template Pattern
```tsx
// Simple page — content-first, minimal logic
export default function Page(): JSX.Element {
  return (
    <Layout title="Page Title" description="Clear description">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            {/* Content goes here — constrained width */}
          </div>
        </div>
      </main>
    </Layout>
  );
}
```

### Route Structure
```
/                    → Home (index.tsx)
/blog/               → Blog listing
/docs/systems/       → System architecture docs
/docs/concepts/      → Reusable engineering concepts
/docs/projects/      → Project implementations
/about               → Professional profile
```

### Configuration Ownership
```
docusaurus.config.ts → Site-wide config, navbar, footer, plugins
sidebars.ts          → Doc sidebar structure
src/css/custom.css   → Theme variable overrides
```

## Anti-Patterns

- **Deep component trees**: Components nested 4+ levels deep for a content page
- **Over-componentization**: Extracting a 5-line JSX block into its own component file
- **Routing complexity**: SPA-style dynamic routing in a static content site
- **Global CSS leaks**: Styles in `custom.css` that override component-specific styles
- **Framework churn**: Adding React state management to a mostly-static site
- **Duplicate layouts**: Multiple layout components doing the same thing with slight variations
- **Config sprawl**: Configuration split across multiple files when one file suffices

## Checklist

- [ ] Components are flat (max 2 levels nesting)
- [ ] Shared components defined once in `src/components/`
- [ ] Page routes mirror content architecture
- [ ] CSS is scoped or limited to theme overrides
- [ ] No unnecessary dynamic data fetching on static pages
- [ ] Navigation reflects locked site architecture
- [ ] Configuration has one canonical location per concern
