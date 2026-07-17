import {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {
  difficultyForItem,
  difficultyLabel,
  formatArticleDate,
  thumbForDifficulty,
} from '@site/src/lib/content';
import type {Difficulty} from '@site/src/lib/content';
import type {ContentItem} from '@site/src/data/content-feed';
import {useLocaleData} from '@site/src/lib/locale-data';

type DocMetaExtra = {
  readingTime?: number;
};

type DocFrontMatterExtra = {
  description?: string;
  type?: ContentItem['type'];
  difficulty?: string;
  featured?: boolean;
  tags?: string[];
};

function itemFromDoc(
  metadata: ReturnType<typeof useDoc>['metadata'] & DocMetaExtra,
  frontMatter: DocFrontMatterExtra,
): ContentItem {
  return {
    title: metadata.title,
    description: (frontMatter.description as string) ?? '',
    link: metadata.permalink,
    type: (frontMatter.type as ContentItem['type']) ?? 'concept',
    date: metadata.lastUpdatedAt
      ? new Date(metadata.lastUpdatedAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    readingTime: metadata.readingTime ? Math.ceil(metadata.readingTime) : undefined,
  };
}

export default function ArticleHeader(): ReactNode {
  const {metadata, frontMatter} = useDoc();
  const {typeLabels, ui, locale} = useLocaleData();
  const fm = frontMatter as DocFrontMatterExtra;
  const meta = metadata as typeof metadata & DocMetaExtra;
  const item = itemFromDoc(meta, fm);
  const difficulty = (fm.difficulty ?? difficultyForItem(item)) as Difficulty;
  const tags = fm.tags ?? [];
  const featured = Boolean(fm.featured);

  return (
    <header className="article-header card-pro">
      <div className="article-header__copy">
        {featured && <span className="badge badge-featured">{ui.common.featuredBadge}</span>}
        <h1 className="article-header__title">{metadata.title}</h1>
        {fm.description && (
          <p className="article-header__desc">{fm.description}</p>
        )}
        <div className="article-header__meta">
          <span>
            {item.readingTime ?? 5} {ui.common.minRead}
          </span>
          <span>·</span>
          <span>{difficultyLabel(difficulty, locale)}</span>
          <span>·</span>
          <span>{typeLabels[item.type]}</span>
          <span>·</span>
          <span>{formatArticleDate(item.date, locale)}</span>
        </div>
        {tags.length > 0 && (
          <div className="tag-row">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="article-header__visual">
        <img src={thumbForDifficulty(difficulty)} alt="" loading="lazy" />
      </div>
    </header>
  );
}
