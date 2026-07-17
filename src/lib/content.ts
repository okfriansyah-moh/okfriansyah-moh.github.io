import type {ContentItem, ContentType} from '@site/src/data/content-feed';
import {getLocaleData, type SiteLocale} from '@site/src/lib/locale-data';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

const THUMB_BY_DIFFICULTY: Record<Difficulty, string> = {
  Beginner: '/img/thumb-beginner.png',
  Intermediate: '/img/thumb-intermediate.png',
  Advanced: '/img/thumb-advanced.png',
};

const DIFFICULTY_BY_TYPE: Record<ContentType, Difficulty> = {
  system: 'Advanced',
  concept: 'Intermediate',
  project: 'Intermediate',
  blog: 'Beginner',
};

const DIFFICULTY_LABEL_KEYS: Record<Difficulty, keyof ReturnType<typeof getLocaleData>['ui']['difficulty']> = {
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
};

export function thumbForItem(item: ContentItem): string {
  return THUMB_BY_DIFFICULTY[difficultyForItem(item)];
}

export function thumbForDifficulty(difficulty: Difficulty): string {
  return THUMB_BY_DIFFICULTY[difficulty];
}

export function difficultyForItem(item: ContentItem): Difficulty {
  return DIFFICULTY_BY_TYPE[item.type];
}

export function difficultyLabel(difficulty: Difficulty, locale: SiteLocale = 'en'): string {
  const key = DIFFICULTY_LABEL_KEYS[difficulty];
  return getLocaleData(locale).ui.difficulty[key];
}

export function relatedArticles(
  item: ContentItem,
  feed: ContentItem[],
  limit = 3,
): ContentItem[] {
  return feed.filter((i) => i.link !== item.link && i.type === item.type).slice(0, limit);
}

export function articlesByType(type: ContentType, feed: ContentItem[]): ContentItem[] {
  return feed.filter((i) => i.type === type);
}

export function formatArticleDate(date: string, locale: SiteLocale = 'en'): string {
  return new Date(date + 'T00:00:00').toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function feedItemByLink(link: string, feed: ContentItem[]): ContentItem | undefined {
  return feed.find((item) => item.link === link);
}

export function titleForLink(link: string, feed: ContentItem[], fallback = 'Read article'): string {
  return feedItemByLink(link, feed)?.title ?? fallback;
}
