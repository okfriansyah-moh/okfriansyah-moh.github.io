import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {CONTENT_FEED} from '@site/src/data/content-feed';
import {difficultyForItem, formatArticleDate, relatedArticles, thumbForItem} from '@site/src/lib/content';
import type {ContentItem} from '@site/src/data/content-feed';

type DocMetaExtra = { readingTime?: number };
type DocFrontMatterExtra = {
  description?: string;
  difficulty?: string;
  repo?: string;
  tech?: string[];
};

function matchFeedItem(link: string): ContentItem | undefined {
  return CONTENT_FEED.find((i) => i.link === link);
}

export default function ArticleSidebar() {
  const {metadata, frontMatter} = useDoc();
  const fm = frontMatter as DocFrontMatterExtra;
  const meta = metadata as typeof metadata & DocMetaExtra;
  const feedItem = matchFeedItem(metadata.permalink);
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
  const related = relatedArticles(item, 3);

  return (
    <div className="article-sidebar">
      <div className="card-pro article-info">
        <h2 className="article-info__title">Article info</h2>
        <dl className="article-info__list">
          <div>
            <dt>Difficulty</dt>
            <dd>{difficulty}</dd>
          </div>
          <div>
            <dt>Reading time</dt>
            <dd>{item.readingTime ?? 5} min</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{formatArticleDate(item.date)}</dd>
          </div>
          {metadata.lastUpdatedAt && (
            <div>
              <dt>Updated</dt>
              <dd>{formatArticleDate(new Date(metadata.lastUpdatedAt).toISOString().slice(0, 10))}</dd>
            </div>
          )}
          <div>
            <dt>Repository</dt>
            <dd>
              <a href={repo} target="_blank" rel="noopener noreferrer">
                GitHub ↗
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
          <h2 className="related-articles__title">Related articles</h2>
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
