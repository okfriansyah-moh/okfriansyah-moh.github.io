import Link from '@docusaurus/Link';
import type {ContentItem} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {formatShortDate} from '@site/src/lib/feed';

const typeColor: Record<ContentItem['type'], string> = {
  system: 'var(--color-system)',
  concept: 'var(--color-concept)',
  project: 'var(--color-project)',
  blog: 'var(--color-blog)',
};

export default function FeedRow({title, description, link, type, date, readingTime}: ContentItem) {
  return (
    <article className="feed-row">
      <Link to={link} className="feed-row-link group">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 m-0 mb-2">
          <span
            className="font-mono text-meta font-medium uppercase tracking-[0.14em]"
            style={{color: typeColor[type]}}>
            {TYPE_LABELS[type]}
          </span>
          <span className="text-muted text-meta" aria-hidden="true">
            ·
          </span>
          <time className="font-mono text-meta text-muted" dateTime={date}>
            {formatShortDate(date)}
          </time>
        </p>
        <h3 className="font-display text-[1.35rem] font-bold leading-snug text-[var(--ifm-font-color-base)] m-0 mb-1.5 group-hover:text-accent transition-colors duration-150">
          {title}
        </h3>
        <p className="text-body-sm leading-relaxed text-muted m-0 mb-2.5 line-clamp-2">
          {description}
        </p>
        {readingTime != null && (
          <p className="font-mono text-meta text-muted m-0">{readingTime} min read</p>
        )}
      </Link>
    </article>
  );
}
