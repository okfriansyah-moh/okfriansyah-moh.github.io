/**
 * Homepage content feed — metadata in src/data/i18n/{locale}/content-feed.meta.json.
 * New topic-index documents are merged via scripts/sync-content-feed.mjs (prebuild).
 */
import enFeedMeta from './i18n/en/content-feed.meta.json';

export type ContentType = 'system' | 'concept' | 'project' | 'blog';

export type ContentItem = {
  title: string;
  description: string;
  link: string;
  type: ContentType;
  date: string; // ISO YYYY-MM-DD
  readingTime?: number; // minutes, computed by scripts/sync-content-feed.mjs
};

/** @deprecated Use useTypeLabels() from locale-data instead */
export const TYPE_LABELS: Record<ContentType, string> = {
  system: 'System',
  concept: 'Concept',
  project: 'Project',
  blog: 'Blog',
};

/** @deprecated Use useLocaleData().typeFilters instead */
export const TYPE_FILTERS: Array<{id: ContentType | 'all'; label: string}> = [
  {id: 'all', label: 'All'},
  {id: 'system', label: 'Systems'},
  {id: 'concept', label: 'Concepts'},
  {id: 'blog', label: 'Blog'},
];

/** @deprecated Use useContentFeed() from locale-data instead */
export const CONTENT_FEED: ContentItem[] = (enFeedMeta.items as ContentItem[]).sort((a, b) =>
  b.date.localeCompare(a.date),
);
