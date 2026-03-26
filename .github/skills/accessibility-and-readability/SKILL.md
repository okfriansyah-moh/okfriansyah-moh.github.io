---
name: accessibility-and-readability
description: "Ensure accessibility and readability standards. Use when implementing semantic HTML, ensuring WCAG compliance, optimizing text readability, or building inclusive navigation and content structure."
---

# Accessibility and Readability

## When to Use

- Building or reviewing page structure for semantic correctness
- Ensuring WCAG 2.1 AA compliance
- Optimizing text readability for long-form content
- Implementing keyboard navigation and screen reader support
- Reviewing color contrast and visual accessibility

## Rules

1. Semantic HTML is mandatory — use `<article>`, `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`
2. Every interactive element must be keyboard accessible — Tab, Enter, Escape
3. Color contrast minimum: 4.5:1 for normal text, 3:1 for large text (WCAG AA)
4. Images must have descriptive `alt` text — decorative images use `alt=""`
5. Heading levels must not be skipped — H1 → H2 → H3 (not H1 → H3)
6. Focus indicators must be visible — never `outline: none` without a replacement
7. Line length max 75 characters for body text — beyond this, reading comprehension drops
8. Body text minimum 16px — smaller text requires explicit justification
9. Color must not be the only way to convey information — add icons or text labels

## Patterns

### Semantic Page Structure
```html
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/docs/systems">Systems</a>
    </nav>
  </header>

  <main id="main-content">
    <article>
      <h1>Page Title</h1>
      <section>
        <h2>Section Title</h2>
        <p>Content...</p>
      </section>
    </article>
  </main>

  <footer>
    <nav aria-label="Footer links">...</nav>
  </footer>
</body>
```

### Skip Navigation Link
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
  padding: 8px 16px;
  background: var(--color-accent);
  color: white;
}
.skip-link:focus {
  top: 0;
}
</style>
```

### Readable Typography
```css
.prose {
  font-size: 1.0625rem;      /* 17px — slightly above minimum */
  line-height: 1.75;          /* Generous for reading */
  max-width: 42rem;           /* ~65 characters per line */
  color: var(--color-text);   /* High contrast against background */
  letter-spacing: -0.01em;    /* Slight tightening for body text */
}

.prose h2 {
  margin-top: 2.5rem;         /* Clear section breaks */
  margin-bottom: 0.75rem;
}

.prose p + p {
  margin-top: 1.25rem;        /* Paragraph spacing */
}
```

### Focus Visible Styles
```css
/* Replace default outline with a clear custom indicator */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove outline for mouse clicks, keep for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast Check
```
Background: #ffffff → Text: #1a1a2e = contrast ratio 15.4:1 ✅
Background: #16161a → Text: #e2e2e8 = contrast ratio 12.7:1 ✅
Accent on white: #0066cc on #ffffff = contrast ratio 5.9:1 ✅
Muted on white: #555770 on #ffffff = contrast ratio 7.1:1 ✅
```

## Anti-Patterns

- **Div soup**: `<div>` for everything instead of semantic elements
- **Outline removal**: `*:focus { outline: none }` with no replacement
- **Low contrast text**: Light gray text (#999) on white background
- **Decorative headings**: Using H3 because it "looks right" instead of matching hierarchy
- **Images without alt**: Meaningful images with no alt text
- **Mouse-only interactions**: Hover-dependent features with no keyboard equivalent
- **Tiny text**: Body text at 14px or smaller
- **Infinite scroll without landmarks**: Screen readers cannot navigate dynamic content
- **Color-only indicators**: Red/green status with no icon or text label

## Checklist

- [ ] Page uses semantic HTML elements (`main`, `article`, `nav`, `section`)
- [ ] All heading levels are sequential (no skipping)
- [ ] Color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [ ] All images have appropriate `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Body text is 16px+ with line height 1.6+
- [ ] Content width is max 75 characters per line
- [ ] Skip navigation link exists
- [ ] Color is not the only means of conveying information
