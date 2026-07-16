import type {ContentItem, ContentType} from '@site/src/data/content-feed';
import {CONTENT_FEED} from '@site/src/data/content-feed';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

const THUMB_BY_TYPE: Record<ContentType, string> = {
  system: '/img/thumb-systems.png',
  concept: '/img/thumb-concepts.png',
  project: '/img/thumb-projects.png',
  blog: '/img/thumb-blog.png',
};

const DIFFICULTY_BY_TYPE: Record<ContentType, Difficulty> = {
  system: 'Advanced',
  concept: 'Intermediate',
  project: 'Intermediate',
  blog: 'Beginner',
};

export function thumbForType(type: ContentType): string {
  return THUMB_BY_TYPE[type];
}

export function difficultyForItem(item: ContentItem): Difficulty {
  return DIFFICULTY_BY_TYPE[item.type];
}

export function relatedArticles(item: ContentItem, limit = 3): ContentItem[] {
  return CONTENT_FEED.filter((i) => i.link !== item.link && i.type === item.type).slice(
    0,
    limit,
  );
}

export function articlesByType(type: ContentType): ContentItem[] {
  return CONTENT_FEED.filter((i) => i.type === type);
}

export function formatArticleDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
