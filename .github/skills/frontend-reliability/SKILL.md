---
name: frontend-reliability
description: "Build reliable frontend applications. Use when implementing error boundaries, handling edge cases, ensuring graceful degradation, building resilient data rendering, or preventing UI crashes from unexpected data."
---

# Frontend Reliability

## When to Use

- Implementing error boundaries to prevent full-page crashes
- Handling NULL, undefined, or malformed data in rendering
- Building graceful degradation for failed components
- Ensuring the UI works without JavaScript for critical content
- Reviewing frontend code for reliability issues

## Rules

1. Content must render without JavaScript — critical text is in HTML, not injected by JS
2. Error boundaries must wrap every major section — one broken component must not crash the page
3. Data rendering must handle NULL, undefined, empty arrays, and unexpected types
4. External resources (images, fonts, scripts) must have fallbacks on load failure
5. Forms must validate on both client and server — client validation is a convenience, not a guarantee
6. Browser APIs must be feature-checked before use — never assume availability
7. Hydration mismatches must be prevented — server-rendered HTML must match client expectations
8. Links must work — every internal link is verified by the build process

## Patterns

### Error Boundary
```tsx
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Component error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Usage: wrap sections, not the entire app
<ErrorBoundary fallback={<p>Failed to load this section.</p>}>
  <DynamicSection />
</ErrorBoundary>
```

### Defensive Data Rendering
```tsx
// Always handle missing/malformed data
function ProjectList({ projects }: { projects?: Project[] }) {
  if (!projects?.length) {
    return <p>No projects available.</p>;
  }

  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>
          {project.title ?? 'Untitled Project'}
        </li>
      ))}
    </ul>
  );
}
```

### Image Fallback
```tsx
function SafeImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [error, setError] = useState(false);

  if (error) {
    return <div className="image-placeholder" aria-label={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
```

### Feature Detection
```typescript
// Check before using browser APIs
function copyToClipboard(text: string): boolean {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false; // Feature not available
  }
  navigator.clipboard.writeText(text);
  return true;
}
```

### Build-Time Link Validation
```javascript
// docusaurus.config.ts — enforce link integrity
{
  onBrokenLinks: 'throw',      // Fail build on broken links
  onBrokenMarkdownLinks: 'throw',
}
```

## Anti-Patterns

- **No error boundaries**: One component error crashes the entire page
- **Assume data shape**: Accessing `data.items[0].name` without null checks
- **JS-dependent content**: Critical text only rendered after JavaScript executes
- **Unhandled promise rejections**: `fetch()` calls with no `.catch()` or try/catch
- **Browser API assumptions**: Using `window.localStorage` without checking SSR context
- **Ignore hydration warnings**: Dismissing React hydration mismatches as "not important"
- **Missing empty states**: Components that render nothing instead of "No results" for empty data
- **Silent failures**: Errors caught and swallowed with no user feedback

## Checklist

- [ ] Error boundaries wrap major page sections
- [ ] Data rendering handles NULL/undefined/empty safely
- [ ] Critical content renders without JavaScript
- [ ] External resources have fallback behavior
- [ ] Browser APIs are feature-checked before use
- [ ] Build fails on broken internal links
- [ ] Empty states exist for all data-dependent components
- [ ] No unhandled promise rejections
- [ ] Hydration mismatches are resolved, not suppressed
