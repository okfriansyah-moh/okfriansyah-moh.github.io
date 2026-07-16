import ContentCard from '@site/src/components/ContentCard';
import type {ContentItem} from '@site/src/data/content-feed';
import {groupByYearMonth} from '@site/src/lib/feed';

type TimelineFeedProps = {
  items: ContentItem[];
  selectedMonth: string | null;
  excludeLinks?: string[];
};

export default function TimelineFeed({items, selectedMonth, excludeLinks = []}: TimelineFeedProps) {
  const visible = items.filter((item) => !excludeLinks.includes(item.link));

  if (visible.length === 0) {
    return (
      <div className="empty-state">
        <p className="text-muted text-sm m-0 font-medium">No articles match this filter.</p>
        <p className="text-muted text-xs mt-2 m-0">Try another month or content type.</p>
      </div>
    );
  }

  const groups = groupByYearMonth(visible);

  return (
    <div className="space-y-14">
      {groups.map((yearGroup) => (
        <section key={yearGroup.year} aria-labelledby={`feed-year-${yearGroup.year}`}>
          {!selectedMonth && (
            <div className="year-divider mb-8">
              <h2
                id={`feed-year-${yearGroup.year}`}
                className="font-display text-3xl font-bold text-[var(--ifm-font-color-base)] m-0">
                {yearGroup.year}
              </h2>
              <span className="font-mono text-xs text-muted">
                {yearGroup.count} {yearGroup.count === 1 ? 'article' : 'articles'}
              </span>
            </div>
          )}

          <div className="space-y-12">
            {yearGroup.months.map((month) => (
              <div key={month.key}>
                <h3 className="month-label">{month.label}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {month.items.map((item, index) => (
                    <ContentCard
                      key={item.link}
                      {...item}
                      featured={!selectedMonth && index === 0 && month.items.length === 1}
                    />
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
