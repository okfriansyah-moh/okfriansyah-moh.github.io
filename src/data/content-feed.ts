/**
 * Homepage content feed — metadata in content-feed.meta.json.
 * New topic-index documents are merged in via scripts/sync-content-feed.mjs (prebuild).
 */
import meta from './content-feed.meta.json';

export type ContentType = 'system' | 'concept' | 'project' | 'blog';

export type ContentItem = {
  title: string;
  description: string;
  link: string;
  type: ContentType;
  date: string; // ISO YYYY-MM-DD
  readingTime?: number; // minutes, computed by scripts/sync-content-feed.mjs
};

export const CONTENT_FEED: ContentItem[] = (meta.items as ContentItem[]).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const TYPE_LABELS: Record<ContentType, string> = {
  system: 'System',
  concept: 'Concept',
  project: 'Project',
  blog: 'Blog',
};

export const TYPE_FILTERS: Array<{id: ContentType | 'all'; label: string}> = [
  {id: 'all', label: 'All'},
  {id: 'system', label: 'Systems'},
  {id: 'concept', label: 'Concepts'},
  {id: 'blog', label: 'Blog'},
];
