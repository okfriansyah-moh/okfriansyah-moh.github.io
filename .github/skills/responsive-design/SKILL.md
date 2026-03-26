---
name: responsive-design
description: "Implement mobile-first responsive design. Use when building layouts that must work across screen sizes, setting breakpoints, designing responsive typography, or ensuring content readability on mobile devices."
---

# Responsive Design

## When to Use

- Building page layouts that must work from mobile to desktop
- Setting breakpoints for a content-focused site
- Designing responsive typography and spacing
- Reviewing existing layouts for mobile usability
- Ensuring reading experience is optimal across devices

## Rules

1. Design mobile-first — start with the smallest screen, enhance upward
2. Content defines breakpoints, not device sizes — break when the layout breaks
3. Maximum content width is 700–900px for reading — never full-width text on large screens
4. Touch targets must be at least 44px × 44px on mobile
5. No horizontal scrolling — ever
6. Font size minimum of 16px on mobile to prevent iOS zoom
7. Images must be responsive — use `max-width: 100%` and appropriate srcset
8. Test on real devices, not just browser resize — touch behavior differs from hover

## Patterns

### Mobile-First Breakpoints
```css
/* Base: Mobile (< 768px) */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 860px;
  }
}
```

### Responsive Typography Scale
```css
:root {
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.5rem;      /* 24px */
  --font-size-2xl: 2rem;       /* 32px */
  --line-height-body: 1.7;
  --line-height-heading: 1.3;
}

/* Increase base size on larger screens */
@media (min-width: 768px) {
  :root {
    --font-size-base: 1.0625rem; /* 17px */
    --font-size-lg: 1.25rem;     /* 20px */
  }
}
```

### Content Width Constraint
```css
.article-content {
  max-width: 42rem; /* ~672px — optimal reading width */
  margin: 0 auto;
  padding: 0 1rem;
}

/* Code blocks can be wider */
.article-content pre {
  max-width: 52rem;
  margin-left: -1rem;
  margin-right: -1rem;
  overflow-x: auto;
}
```

### Responsive Navigation
```css
/* Mobile: hamburger menu */
.nav-links { display: none; }
.nav-toggle { display: block; }

/* Desktop: inline links */
@media (min-width: 768px) {
  .nav-links { display: flex; gap: 1.5rem; }
  .nav-toggle { display: none; }
}
```

## Anti-Patterns

- **Desktop-first**: Designing for desktop and then trying to squeeze into mobile
- **Device-specific breakpoints**: `@media (max-width: 375px)` targeting iPhone specifically
- **Full-width text**: Reading lines of 120+ characters on desktop — unreadable
- **Tiny touch targets**: Links and buttons smaller than 44px on mobile
- **Hidden critical content**: Hiding important content on mobile with `display: none`
- **Fixed-width layouts**: Using pixel widths that don't adapt
- **Viewport zoom disabled**: `user-scalable=no` in meta viewport — accessibility violation
- **Unresponive media**: Images or embeds that overflow their container

## Checklist

- [ ] Layout starts mobile-first (base styles are mobile)
- [ ] Content width constrained to 700–900px for reading
- [ ] Breakpoints defined by content needs, not device names
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scrolling on any screen size
- [ ] Font size is 16px+ on mobile
- [ ] Images use `max-width: 100%`
- [ ] Tested on actual mobile devices (not just browser resize)
