import Link from '@docusaurus/Link';
import type {ContentItem} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {formatShortDate} from '@site/src/lib/feed';

const typeAccent: Record<ContentItem['type'], string> = {
  system: 'card-accent-system',
  concept: 'card-accent-concept',
  project: 'card-accent-project',
  blog: 'card-accent-blog',
};

type ContentCardProps = ContentItem & {
  featured?: boolean;
};

export default function ContentCard({
  title,
  description,
  link,
  type,
  date,
  featured = false,
}: ContentCardProps) {
  return (
    <article className={featured ? 'lg:col-span-2' : undefined}>
      <Link
        to={link}
        className={[
          'group card-surface block h-full no-underline text-inherit',
          'hover:no-underline hover:text-inherit',
          typeAccent[type],
          featured ? 'p-6 sm:p-7' : 'p-5',
        ].join(' ')}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
            {TYPE_LABELS[type]}
          </span>
          <span className="text-muted text-[10px]" aria-hidden="true">
            ·
          </span>
          <time className="font-mono text-[10px] text-muted" dateTime={date}>
            {formatShortDate(date)}
          </time>
        </div>
        <h3
          className={[
            'font-display font-semibold leading-snug text-[var(--ifm-font-color-base)] mb-2 m-0',
            'group-hover:text-accent transition-colors duration-200',
            featured ? 'text-xl sm:text-2xl' : 'text-lg',
          ].join(' ')}>
          {title}
        </h3>
        <p
          className={[
            'leading-relaxed text-muted m-0',
            featured ? 'text-base line-clamp-4' : 'text-[15px] line-clamp-3',
          ].join(' ')}>
          {description}
        </p>
        <span className="inline-block mt-4 font-mono text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Read →
        </span>
      </Link>
    </article>
  );
}
