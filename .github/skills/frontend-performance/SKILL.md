---
name: frontend-performance
description: "Optimize frontend performance for content sites. Use when reducing page load time, minimizing bundle size, optimizing images, implementing lazy loading, or ensuring Core Web Vitals targets are met."
---

# Frontend Performance

## When to Use

- Reducing page load time or bundle size
- Optimizing images and static assets
- Implementing lazy loading for below-fold content
- Measuring and improving Core Web Vitals
- Reviewing a build for unnecessary dependencies

## Rules

1. Performance budget: < 200KB total JavaScript for a content site
2. First Contentful Paint (FCP) target: < 1.5s on 3G
3. Largest Contentful Paint (LCP) target: < 2.5s
4. Cumulative Layout Shift (CLS): < 0.1
5. No JavaScript required for initial content render — HTML and CSS deliver the content
6. Images must be optimized — use WebP/AVIF, appropriate dimensions, and lazy loading
7. Fonts must be subset and preloaded — no full Unicode font files
8. Third-party scripts are banned unless they serve a critical function
9. Bundle analysis must be run before shipping — know what you're sending

## Patterns

### Image Optimization
```html
<!-- Responsive images with modern format -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img
    src="image.jpg"
    alt="Descriptive alt text"
    width="800"
    height="450"
    loading="lazy"
    decoding="async"
  />
</picture>
```

### Font Loading Strategy
```css
/* Preload critical font */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var-latin.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* Show fallback immediately */
  unicode-range: U+0000-00FF; /* Latin subset only */
}
```

```html
<link rel="preload" href="/fonts/inter-var-latin.woff2"
      as="font" type="font/woff2" crossorigin>
```

### Lazy Loading Below-Fold Content
```tsx
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function Page() {
  return (
    <main>
      <article>{/* Main content — renders immediately */}</article>
      <Suspense fallback={null}>
        <HeavyComponent />
      </Suspense>
    </main>
  );
}
```

### Bundle Analysis
```bash
# Docusaurus bundle analysis
npm run build
npx source-map-explorer 'build/assets/js/*.js'

# Check total JS size
find build/assets/js -name '*.js' | xargs wc -c | tail -1
```

### Preconnect to Required Origins
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">
```

## Anti-Patterns

- **Massive bundles**: Shipping 500KB+ of JavaScript for a content site
- **Unoptimized images**: Full-resolution PNGs served to mobile devices
- **Blocking third-party scripts**: Analytics or widget scripts blocking initial render
- **Layout shifts**: Content jumping after lazy-loaded images or fonts arrive
- **Full font files**: Loading 500KB font files with full Unicode ranges
- **Render-blocking CSS**: Large CSS files that delay first paint
- **No lazy loading**: Loading all images on page load regardless of viewport
- **Development dependencies in production**: Debug tools or dev-only libraries in the bundle

## Checklist

- [ ] Total JavaScript < 200KB for content pages
- [ ] Images are optimized (WebP/AVIF, lazy loaded, sized correctly)
- [ ] Fonts are subset and use `font-display: swap`
- [ ] No third-party scripts unless critical
- [ ] FCP < 1.5s on throttled connection
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Bundle analyzed — no unexpected large dependencies
- [ ] Preconnect/preload for critical resources
