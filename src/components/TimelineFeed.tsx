import ContentCard from '@site/src/components/ContentCard';
import type {ContentItem} from '@site/src/data/content-feed';
import {groupByYearMonth} from '@site/src/lib/feed';

type TimelineFeedProps = {
  items: ContentItem[];
  selectedMonth: string | null;
};

export default function TimelineFeed({items, selectedMonth}: TimelineFeedProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
        <p className="text-muted text-sm m-0">No articles match this filter.</p>
        <p className="text-muted text-xs mt-2 m-0">Try a different month or content type.</p>
      </div>
    );
  }

  const groups = groupByYearMonth(items);

  return (
    <div className="space-y-12">
      {groups.map((yearGroup) => (
        <section key={yearGroup.year} aria-labelledby={`feed-year-${yearGroup.year}`}>
          {!selectedMonth && (
            <div className="flex items-baseline gap-3 mb-6 pb-3 border-b border-border">
              <h2
                id={`feed-year-${yearGroup.year}`}
                className="font-display text-2xl font-bold text-[var(--ifm-font-color-base)] m-0">
                {yearGroup.year}
              </h2>
              <span className="font-mono text-xs text-muted">
                {yearGroup.count} {yearGroup.count === 1 ? 'article' : 'articles'}
              </span>
            </div>
          )}

          <div className="space-y-10">
            {yearGroup.months.map((month) => (
              <div key={month.key}>
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-4 m-0">
                  {month.label} {month.year}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {month.items.map((item) => (
                    <ContentCard key={item.link} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
