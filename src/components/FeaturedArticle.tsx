import Link from '@docusaurus/Link';
import type {ContentItem} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {formatDisplayDate} from '@site/src/lib/feed';

type FeaturedArticleProps = {
  item: ContentItem;
  compact?: boolean;
};

export default function FeaturedArticle({item, compact = false}: FeaturedArticleProps) {
  return (
    <article
      className={[
        'relative overflow-hidden rounded-xl border border-border bg-[var(--ifm-background-color)]',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
        compact ? '' : 'lg:min-h-[280px]',
      ].join(' ')}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent/70 to-transparent" />
      <Link
        to={item.link}
        className="block h-full p-6 sm:p-7 no-underline text-inherit hover:no-underline hover:text-inherit group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3 m-0">
          Latest · {TYPE_LABELS[item.type]}
        </p>
        <h2
          className={[
            'font-display font-bold leading-tight text-[var(--ifm-font-color-base)] m-0 mb-3',
            'group-hover:text-accent transition-colors duration-200',
            compact ? 'text-xl' : 'text-2xl sm:text-[1.65rem]',
          ].join(' ')}>
          {item.title}
        </h2>
        <p className="text-[15px] leading-relaxed text-muted m-0 mb-4 line-clamp-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-border/80">
          <time className="font-mono text-[11px] text-muted" dateTime={item.date}>
            {formatDisplayDate(item.date)}
          </time>
          <span className="font-mono text-[11px] font-medium text-accent group-hover:translate-x-0.5 transition-transform duration-200">
            Read article →
          </span>
        </div>
      </Link>
    </article>
  );
}
