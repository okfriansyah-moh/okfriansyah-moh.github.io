/**
 * Shared article layout tokens for every docs page (current + future).
 * Consumed by DocItem/Layout swizzle and custom.css via CSS variables.
 */
export const ARTICLE_LAYOUT = {
  stageMaxPx: 1220,
  shellMaxPx: 1280,
  columns: {
    toc: 220,
    main: 720,
    meta: 280,
  },
  breakpointPx: 1100,
} as const;

export const ARTICLE_LAYOUT_CLASS = 'article-framework';
