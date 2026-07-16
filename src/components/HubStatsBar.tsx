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
      <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Knowledge base
          </span>
          {chips.map(({label, value}) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold text-[var(--ifm-font-color-base)]">
                {value}
              </span>
              <span className="font-mono text-[11px] text-muted">{label}</span>
            </div>
          ))}
          <span className="hidden sm:inline font-mono text-[11px] text-muted ml-auto">
            Updated from public GitHub engineering work
          </span>
        </div>
      </div>
    </div>
  );
}
