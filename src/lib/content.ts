import type {ContentItem, ContentType} from '@site/src/data/content-feed';
import {CONTENT_FEED} from '@site/src/data/content-feed';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

const THUMB_BY_DIFFICULTY: Record<Difficulty, string> = {
  Beginner: '/img/thumb-beginner.png',
  Intermediate: '/img/thumb-intermediate.png',
  Advanced: '/img/thumb-advanced.png',
};

const THUMB_BY_TYPE: Record<ContentType, string> = {
  system: '/img/thumb-advanced.png',
  concept: '/img/thumb-intermediate.png',
  project: '/img/thumb-intermediate.png',
  blog: '/img/thumb-beginner.png',
};

const DIFFICULTY_BY_TYPE: Record<ContentType, Difficulty> = {
  system: 'Advanced',
  concept: 'Intermediate',
  project: 'Intermediate',
  blog: 'Beginner',
};

/** @deprecated Use thumbForItem instead */
export function thumbForType(type: ContentType): string {
  return THUMB_BY_TYPE[type];
}

export function thumbForItem(item: ContentItem): string {
  return THUMB_BY_DIFFICULTY[difficultyForItem(item)];
}

export function thumbForDifficulty(difficulty: Difficulty): string {
  return THUMB_BY_DIFFICULTY[difficulty];
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
