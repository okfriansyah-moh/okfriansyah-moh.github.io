import Link from '@docusaurus/Link';
import type {ContentItem} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {formatShortDate} from '@site/src/lib/feed';

const typeAccent: Record<ContentItem['type'], string> = {
  system: 'border-l-system',
  concept: 'border-l-concept',
  project: 'border-l-project',
  blog: 'border-l-blog',
};

export default function ContentCard({title, description, link, type, date}: ContentItem) {
  return (
    <article>
      <Link
        to={link}
        className={[
          'group block rounded-lg border border-border bg-[var(--ifm-background-color)]',
          'border-l-[3px] pl-0 no-underline text-inherit',
          'hover:border-accent/40 hover:bg-[var(--color-card-hover)]',
          'hover:no-underline hover:text-inherit',
          'transition-colors duration-200',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          typeAccent[type],
        ].join(' ')}>
        <div className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent">
              {TYPE_LABELS[type]}
            </span>
            <span className="text-muted text-[11px]" aria-hidden="true">
              ·
            </span>
            <time className="font-mono text-[11px] text-muted" dateTime={date}>
              {formatShortDate(date)}
            </time>
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug text-[var(--ifm-font-color-base)] mb-2 group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          <p className="text-[15px] leading-relaxed text-muted m-0 line-clamp-3">{description}</p>
        </div>
      </Link>
    </article>
  );
}
