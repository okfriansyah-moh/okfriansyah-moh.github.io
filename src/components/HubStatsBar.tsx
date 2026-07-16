import type {ContentItem} from '@site/src/data/content-feed';

export type HubStats = {
  total: number;
  systems: number;
  concepts: number;
  blog: number;
  years: number;
};

export function computeHubStats(items: ContentItem[]): HubStats {
  const years = new Set(items.map((i) => new Date(i.date + 'T00:00:00').getFullYear()));
  return {
    total: items.length,
    systems: items.filter((i) => i.type === 'system').length,
    concepts: items.filter((i) => i.type === 'concept').length,
    blog: items.filter((i) => i.type === 'blog').length,
    years: years.size,
  };
}

type HubStatsBarProps = {
  stats: HubStats;
};

export default function HubStatsBar({stats}: HubStatsBarProps) {
  const chips = [
    {label: 'Articles', value: stats.total},
    {label: 'Systems', value: stats.systems},
    {label: 'Concepts', value: stats.concepts},
    {label: 'Years', value: stats.years},
  ];

  return (
    <div className="border-y border-border bg-surface/60">
      <div className="page-shell py-3 md:py-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-6">
          <span className="font-mono text-meta uppercase tracking-[0.18em] text-muted">
            Knowledge base
          </span>
          {chips.map(({label, value}) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="font-display text-lg md:text-xl font-bold text-[var(--ifm-font-color-base)] tabular-nums">
                {value}
              </span>
              <span className="font-mono text-meta text-muted">{label}</span>
            </div>
          ))}
          <span className="hidden md:inline font-mono text-meta text-muted md:ml-auto">
            Updated from public GitHub engineering work
          </span>
        </div>
      </div>
    </div>
  );
}
