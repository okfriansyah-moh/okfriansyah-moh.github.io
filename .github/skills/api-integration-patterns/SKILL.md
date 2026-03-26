---
name: api-integration-patterns
description: "Implement clean API integration patterns. Use when fetching data from APIs, designing client-side data fetching, implementing error handling for network calls, or establishing patterns for API consumption in frontend applications."
---

# API Integration Patterns

## When to Use

- Fetching data from REST or GraphQL APIs
- Designing client-side data fetching strategy
- Implementing error handling for network calls
- Building API client layers
- Choosing between build-time and runtime data fetching

## Rules

1. Prefer build-time data fetching for content sites — runtime API calls only when data changes frequently
2. API client is a thin layer — no business logic in the client, just data transformation
3. Every API call must have a timeout — no unbounded network waits on the client
4. Loading and error states must be handled explicitly — no blank screens on failure
5. Cache API responses — avoid refetching data that hasn't changed
6. API response types must be defined — never use `any` for API data
7. Authentication tokens must not be stored in localStorage — use httpOnly cookies or memory
8. Failed requests must show meaningful error messages — not raw error objects

## Patterns

### Build-Time Data Fetching (Preferred for Content)
```tsx
// Docusaurus plugin: data fetched at build time, zero runtime cost
export default function FeaturePage({ features }) {
  return (
    <ul>
      {features.map(f => <li key={f.id}>{f.title}</li>)}
    </ul>
  );
}

// Data comes from static files, MDX frontmatter, or build plugins
// No runtime API call needed
```

### API Client Layer
```typescript
// Thin client — types + fetch, no business logic
interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function fetchApi<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { data: null as T, error: `HTTP ${response.status}` };
    }

    const data: T = await response.json();
    return { data };
  } catch (err) {
    clearTimeout(timeout);
    return { data: null as T, error: 'Network error' };
  }
}
```

### Loading and Error States
```tsx
function DataSection() {
  const { data, error, isLoading } = useFetch<Project[]>('/api/projects');

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.length) return <EmptyState />;

  return <ProjectList projects={data} />;
}
```

### Response Type Definition
```typescript
// Always define the shape of API responses
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

// Never: const data: any = await response.json();
```

### Stale-While-Revalidate
```typescript
async function fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached && !isStale(cached)) {
    return cached.data;
  }

  // Return stale data immediately, refresh in background
  if (cached) {
    fetcher().then(data => cache.set(key, data));
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, data);
  return data;
}
```

## Anti-Patterns

- **Runtime fetch for static data**: Calling an API on every page load for data that changes weekly
- **No error handling**: Letting API errors crash the UI or show blank screens
- **Untyped responses**: Using `any` for all API data
- **Tokens in localStorage**: Storing auth credentials in browser-accessible storage
- **No timeout**: Fetch calls that hang indefinitely on slow connections
- **Business logic in API client**: Data transformation and validation mixed into fetch functions
- **Optimistic UI without rollback**: Updating UI before confirming API success, with no undo on failure
- **Waterfall requests**: Fetching resource A, then B, then C sequentially when they're independent

## Checklist

- [ ] Build-time fetching used where possible for content
- [ ] Every runtime API call has a timeout
- [ ] Loading and error states handled for all data-dependent UI
- [ ] API response types are defined (no `any`)
- [ ] Auth tokens stored securely (httpOnly cookies or memory)
- [ ] Responses cached where appropriate
- [ ] Independent requests fetched in parallel, not sequentially
- [ ] Error messages are user-friendly, not raw error objects
