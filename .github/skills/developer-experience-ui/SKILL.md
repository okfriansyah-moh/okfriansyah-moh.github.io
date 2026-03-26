---
name: developer-experience-ui
description: "Optimize developer experience for frontend development. Use when setting up development tooling, improving build feedback loops, designing component development workflow, or establishing frontend development conventions."
---

# Developer Experience UI

## When to Use

- Setting up frontend development environment
- Improving build and iteration speed
- Establishing code conventions for frontend
- Designing component development and testing workflow
- Reviewing DX friction in the development process

## Rules

1. Development server must hot-reload in < 2 seconds — slow feedback kills productivity
2. Build errors must be clear and actionable — no cryptic webpack errors without context
3. TypeScript strict mode is required — catch errors at compile time, not runtime
4. Linting runs on save — immediate feedback, not deferred to CI
5. File naming conventions must be consistent — enforce with tooling, not documentation
6. Component files must be colocated with their styles and tests
7. Import paths must be clean — use path aliases, no `../../../` chains
8. Development builds must match production behavior — no dev-only features that mask bugs

## Patterns

### Project Configuration
```json
// tsconfig.json — strict mode, path aliases
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@components/*": ["src/components/*"],
      "@css/*": ["src/css/*"]
    }
  }
}
```

### File Naming Convention
```
src/components/
├── Card/
│   ├── index.tsx          # Component
│   ├── Card.module.css    # Scoped styles
│   └── Card.test.tsx      # Test (colocated)
├── Layout/
│   ├── index.tsx
│   └── Layout.module.css
```

### Development Scripts
```json
// package.json — fast feedback loop
{
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/ --ext .ts,.tsx",
    "check": "npm run typecheck && npm run lint && npm run build"
  }
}
```

### Clean Imports
```tsx
// CLEAN: path aliases
import { Card } from '@components/Card';
import styles from '@css/custom.css';

// MESSY: relative path chains
import { Card } from '../../../components/Card';
import styles from '../../../css/custom.css';
```

### Pre-commit Validation
```yaml
# .husky/pre-commit or similar
npm run typecheck
npm run lint --quiet
```

### Error Message Quality
```typescript
// Help developers with clear error context
function loadConfig(path: string): Config {
  const raw = readFileSync(path, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      `Failed to parse config at ${path}. ` +
      `Check for syntax errors in the JSON file.`
    );
  }
}
```

## Anti-Patterns

- **Slow hot reload**: Development server taking 5+ seconds to reflect changes
- **Loose TypeScript**: `strict: false` or widespread `any` usage
- **Scattered files**: Component, styles, and tests in three different directory trees
- **Deep relative imports**: `../../../../components/Button` instead of path aliases
- **Deferred linting**: Only running lint in CI, not on save
- **Dev/prod divergence**: Features that work in dev but break in production build
- **No type checking**: Relying entirely on runtime errors to catch type issues
- **Manual formatting**: Debating code style instead of enforcing with Prettier
- **Silent build warnings**: Ignoring deprecation and type warnings until they become errors

## Checklist

- [ ] Hot reload works in < 2 seconds
- [ ] TypeScript strict mode is enabled
- [ ] Linting runs on save (editor integration)
- [ ] File naming convention is consistent and enforced
- [ ] Component files are colocated (component + styles + test)
- [ ] Import paths use aliases (no deep relative paths)
- [ ] Build errors are clear and actionable
- [ ] Pre-commit hooks validate types and lint
- [ ] Dev build behavior matches production
