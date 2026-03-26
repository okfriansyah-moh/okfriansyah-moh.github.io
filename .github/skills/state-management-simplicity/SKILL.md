---
name: state-management-simplicity
description: "Keep frontend state management simple. Use when deciding state management strategy, avoiding unnecessary state libraries, choosing between local and global state, or designing data flow for content-focused applications."
---

# State Management Simplicity

## When to Use

- Deciding whether to add a state management library
- Choosing between local component state and global state
- Designing data flow for a content-focused site
- Reviewing state management for unnecessary complexity
- Refactoring over-managed state back to simple patterns

## Rules

1. Content sites need almost zero client-side state — static rendering handles most cases
2. Default to local component state (`useState`) — promote to shared state only when proven necessary
3. URL is state — use query parameters and route segments, not in-memory stores
4. Server state (fetched data) uses the fetch library's cache — do not duplicate into a store
5. No state management library unless the app has 10+ components sharing the same state
6. Derived state is computed, not stored — never sync two state variables manually
7. Form state is local — never put form input values in global state
8. If state feels complex, the component tree is probably wrong — restructure before abstracting

## Patterns

### Local State (Default)
```tsx
// This is sufficient for 90% of content site interactivity
function SearchFilter() {
  const [query, setQuery] = useState('');
  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultList items={filtered} />
    </>
  );
}
```

### URL as State
```tsx
// Use URL params instead of in-memory state for filterable views
function TagPage() {
  const { tag } = useParams();  // State lives in the URL
  const docs = getDocsByTag(tag); // Derived from URL

  return <DocList docs={docs} />;
}
```

### Derived State (Computed, Not Stored)
```tsx
// CORRECT: Derive from source
function Dashboard({ items }) {
  const total = items.length; // Derived
  const completed = items.filter(i => i.done).length; // Derived

  return <Stats total={total} completed={completed} />;
}

// WRONG: Storing derived values separately
function Dashboard({ items }) {
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setTotal(items.length);
    setCompleted(items.filter(i => i.done).length);
  }, [items]); // Unnecessary sync
}
```

### Static Data Pattern (Docusaurus)
```tsx
// Docusaurus provides data at build time — no runtime state needed
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function SiteTitle() {
  const { siteConfig } = useDocusaurusContext();
  return <h1>{siteConfig.title}</h1>; // Build-time data, not state
}
```

## Anti-Patterns

- **Redux for a blog**: Installing Redux/Zustand/Jotai for a site with 3 interactive components
- **Global form state**: Putting form input values in a global store
- **Synced derived state**: `useEffect` that syncs computed values into separate state variables
- **State management library as first step**: Starting a project by configuring Redux
- **Prop drilling panic**: Adding global state because props pass through 2 levels
- **State for static data**: Storing build-time content in runtime state
- **Multiple stores**: Using 3+ state management solutions in one app
- **Client state for server data**: Manually managing cached API responses instead of using SWR/React Query

## Checklist

- [ ] No state management library unless 10+ components share state
- [ ] Local state is the default for component interactivity
- [ ] URL parameters used for shareable/navigable state
- [ ] Derived values are computed, not stored
- [ ] No `useEffect` syncing one state variable to another
- [ ] Form state is component-local
- [ ] Static/build-time data is not stored as runtime state
- [ ] State complexity matches actual interactivity needs
