---
name: design-systems-minimalism
description: "Build minimal design systems with consistent tokens. Use when defining spacing scales, color palettes, typography tokens, or establishing visual consistency without introducing a heavy component library."
---

# Design Systems Minimalism

## When to Use

- Defining a consistent visual language for a site
- Setting up design tokens (spacing, color, typography)
- Establishing component patterns without a heavy UI library
- Reviewing UI for visual consistency
- Preventing CSS entropy and style drift

## Rules

1. Design system = tokens + constraints, not a component library
2. Use a spacing scale — every margin and padding must come from the scale
3. Color palette is 5 colors max for a content site — background, text, accent, muted, border
4. Typography uses 1 font family for prose, 1 for code — no font variety
5. Components use design tokens — never hardcode color or spacing values
6. Dark mode must work via CSS custom properties — no JavaScript theme toggling
7. Visual consistency comes from constraints, not documentation
8. Less is more — if you're not sure about adding a visual element, don't

## Patterns

### Design Token System
```css
:root {
  /* Spacing scale (4px base) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */

  /* Colors — light mode */
  --color-bg: #ffffff;
  --color-text: #1a1a2e;
  --color-text-secondary: #555770;
  --color-accent: #0066cc;
  --color-border: #e2e2e8;
  --color-code-bg: #f5f5f7;

  /* Typography */
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}

/* Dark mode via prefers-color-scheme */
[data-theme='dark'] {
  --color-bg: #16161a;
  --color-text: #e2e2e8;
  --color-text-secondary: #94949e;
  --color-accent: #4d9fff;
  --color-border: #2a2a35;
  --color-code-bg: #1e1e28;
}
```

### Spacing Usage (Always Use Tokens)
```css
/* CORRECT: using scale */
.section { margin-top: var(--space-12); }
.card { padding: var(--space-6); }
.item + .item { margin-top: var(--space-4); }

/* WRONG: arbitrary values */
.section { margin-top: 47px; }
.card { padding: 22px; }
```

### Minimal Component Pattern
```css
/* Card — one of few reusable components needed */
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  background: var(--color-bg);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.card-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
```

### Component Inventory for a Content Site
```
Required components (minimal set):
- Layout (page wrapper with nav + footer)
- Card (linked content preview)
- Tag (category label)
- Code block (syntax highlighted)
- Callout (note/warning box)

NOT needed:
- Modal, Tooltip, Accordion, Tabs, Carousel
- Toast, Popover, Drawer, Breadcrumb
```

## Anti-Patterns

- **Arbitrary spacing**: Using 13px, 47px, 22px — no consistent scale
- **Color explosion**: 20+ colors in the palette for a content site
- **Font variety**: Using 3+ font families — inconsistent and slow to load
- **Component library overkill**: Installing a full UI framework for a static site
- **Hardcoded values**: `color: #333` in component CSS instead of `var(--color-text)`
- **Design token sprawl**: 50+ tokens that nobody remembers — keep it tight
- **Style duplication**: Same visual pattern defined differently across components
- **Dark mode as afterthought**: Separate CSS for dark mode instead of CSS custom properties

## Checklist

- [ ] Spacing uses a consistent scale (4px or 8px base)
- [ ] Color palette is 5 colors max (+ dark mode variants)
- [ ] Typography uses 1 body font + 1 code font
- [ ] All components use design tokens, no hardcoded values
- [ ] Dark mode works via CSS custom properties
- [ ] Component inventory is minimal (no unused component patterns)
- [ ] Visual consistency is verifiable by scanning the page
- [ ] No imported UI component library (unless justified by scale)
