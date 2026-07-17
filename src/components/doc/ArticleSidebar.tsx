import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {
  difficultyForItem,
  difficultyLabel,
  formatArticleDate,
  relatedArticles,
  thumbForItem,
} from '@site/src/lib/content';
import type {ContentItem} from '@site/src/data/content-feed';
import {useLocaleData} from '@site/src/lib/locale-data';

type DocMetaExtra = { readingTime?: number };
type DocFrontMatterExtra = {
  description?: string;
  difficulty?: string;
  repo?: string;
  tech?: string[];
};

function matchFeedItem(link: string, feed: ContentItem[]): ContentItem | undefined {
  return feed.find((i) => i.link === link);
}

export default function ArticleSidebar() {
  const {metadata, frontMatter} = useDoc();
  const {contentFeed, ui, locale} = useLocaleData();
  const fm = frontMatter as DocFrontMatterExtra;
  const meta = metadata as typeof metadata & DocMetaExtra;
  const feedItem = matchFeedItem(metadata.permalink, contentFeed);
  const item: ContentItem = feedItem ?? {
    title: metadata.title,
    description: fm.description ?? '',
    link: metadata.permalink,
    type: 'concept',
    date: new Date().toISOString().slice(0, 10),
    readingTime: meta.readingTime ? Math.ceil(meta.readingTime) : 5,
  };
  const difficulty = fm.difficulty ?? difficultyForItem(item);
  const repo = fm.repo ?? 'https://github.com/okfriansyah-moh';
  const tech = fm.tech ?? [];
  const related = relatedArticles(item, contentFeed, 3);

  return (
    <div className="article-sidebar">
      <div className="card-pro article-info">
        <h2 className="article-info__title">{ui.article.infoTitle}</h2>
        <dl className="article-info__list">
          <div>
            <dt>{ui.article.difficulty}</dt>
            <dd>{difficultyLabel(difficulty as 'Beginner' | 'Intermediate' | 'Advanced', locale)}</dd>
          </div>
          <div>
            <dt>{ui.article.readingTime}</dt>
            <dd>
              {item.readingTime ?? 5} {ui.common.min}
            </dd>
          </div>
          <div>
            <dt>{ui.article.published}</dt>
            <dd>{formatArticleDate(item.date, locale)}</dd>
          </div>
          {metadata.lastUpdatedAt && (
            <div>
              <dt>{ui.article.updated}</dt>
              <dd>
                {formatArticleDate(new Date(metadata.lastUpdatedAt).toISOString().slice(0, 10), locale)}
              </dd>
            </div>
          )}
          <div>
            <dt>{ui.article.repository}</dt>
            <dd>
              <a href={repo} target="_blank" rel="noopener noreferrer">
                {ui.common.github} ↗
              </a>
            </dd>
          </div>
        </dl>
        {tech.length > 0 && (
          <div className="tag-row">
            {tech.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="card-pro related-articles">
          <h2 className="related-articles__title">{ui.article.relatedTitle}</h2>
          <ul className="related-articles__list">
            {related.map((r) => (
              <li key={r.link}>
                <Link to={r.link} className="related-articles__item">
                  <img src={thumbForItem(r)} alt="" />
                  <span>{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
