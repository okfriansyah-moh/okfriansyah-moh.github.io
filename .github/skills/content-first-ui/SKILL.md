---
name: content-first-ui
description: "Design content-first user interfaces. Use when building layouts where text readability is the primary goal, structuring information hierarchy, or ensuring content is the focal point rather than chrome or decoration."
---

# Content-First UI

## When to Use

- Building pages where text is the primary content
- Designing documentation or article layouts
- Structuring information hierarchy for scannability
- Reviewing UI for content readability
- Reducing visual noise that competes with content

## Rules

1. Content is the UI — layout exists to serve text readability, not decoration
2. Typography drives the design — invest in font size, line height, and spacing, not color schemes
3. Whitespace is a feature — generous margins and padding improve comprehension
4. Information hierarchy uses heading levels and spacing, not color or size gimmicks
5. Navigation is secondary — present but never competing with page content
6. Optimal reading width is 45–75 characters per line (~700–860px container)
7. Code blocks must be clearly distinct from prose — use background color and monospace
8. Every page must be scannable in 5 seconds — headings tell the story

## Patterns

### Content Page Layout
```css
.content-page {
  max-width: 52rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.content-page h1 {
  margin-bottom: 0.5rem;
}

.content-page .subtitle {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.125rem;
}
```

### Typography System
```css
/* Prose-optimized typography */
.markdown {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--text-primary);
}

.markdown h2 {
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.markdown h3 {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.markdown p + p {
  margin-top: 1.25rem;
}
```

### Code Block Distinction
```css
.markdown pre {
  background: var(--code-bg);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.markdown code {
  background: var(--code-bg);
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  font-size: 0.9em;
}
```

### Scannable Structure
```markdown
# Clear Page Title

Brief introductory paragraph that sets context in 1-2 sentences.

## Section That Answers "What"

Content here.

## Section That Answers "How"

Content here.

## Section That Answers "Why"

Content here.
```

### Visual Hierarchy via Spacing (Not Color)
```css
/* Section spacing creates hierarchy */
.content-section {
  margin-top: 3rem;
}

.content-subsection {
  margin-top: 2rem;
}

/* Minimal use of color for emphasis */
.callout {
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
  margin: 1.5rem 0;
}
```

## Anti-Patterns

- **Chrome over content**: Navigation bars, sidebars, and toolbars dominating the viewport
- **Narrow content, wide chrome**: Content squeezed between two fat sidebars
- **Decorative elements**: Gradients, shadows, and backgrounds that don't serve readability
- **Poor line height**: Text set at `line-height: 1.2` for long-form prose
- **Too-wide text**: Lines running 100+ characters — forces eye tracking
- **Competing colors**: Multiple accent colors competing for attention on text pages
- **Heading soup**: Using heading sizes for visual styling instead of information hierarchy
- **Dense paragraphs**: Wall-of-text blocks with no whitespace breaks

## Checklist

- [ ] Content width is 45–75 characters per line
- [ ] Line height is 1.6–1.8 for body text
- [ ] Headings create a scannable outline of the page
- [ ] Whitespace between sections is generous (2–3rem)
- [ ] Code blocks are visually distinct from prose
- [ ] Navigation does not compete with content
- [ ] No decorative elements that don't serve readability
- [ ] Page is scannable in 5 seconds via headings
