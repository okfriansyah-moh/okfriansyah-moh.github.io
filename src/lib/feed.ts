import type {ContentItem, ContentType} from '@site/src/data/content-feed';

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

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export type MonthEntry = {
  key: string;
  label: string;
  year: number;
  count: number;
};

export type MonthGroup = {
  key: string;
  label: string;
  year: number;
  items: ContentItem[];
};

export type YearGroup = {
  year: number;
  months: MonthGroup[];
  count: number;
};

function monthKey(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

export function buildMonthIndex(items: ContentItem[]): MonthEntry[] {
  const map = new Map<string, MonthEntry>();

  for (const item of items) {
    const d = new Date(item.date + 'T00:00:00');
    const year = d.getFullYear();
    const month = d.getMonth();
    const key = monthKey(item.date);

    if (!map.has(key)) {
      map.set(key, {key, label: MONTH_NAMES[month], year, count: 0});
    }
    map.get(key)!.count += 1;
  }

  return [...map.values()].sort((a, b) => b.key.localeCompare(a.key));
}

export function filterFeed(
  items: ContentItem[],
  type: ContentType | 'all',
  month: string | null,
): ContentItem[] {
  return items.filter((item) => {
    if (type !== 'all' && item.type !== type) return false;
    if (month && monthKey(item.date) !== month) return false;
    return true;
  });
}

export function groupByYearMonth(items: ContentItem[]): YearGroup[] {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const yearMap = new Map<number, Map<string, ContentItem[]>>();

  for (const item of sorted) {
    const d = new Date(item.date + 'T00:00:00');
    const year = d.getFullYear();
    const key = monthKey(item.date);

    if (!yearMap.has(year)) yearMap.set(year, new Map());
    const months = yearMap.get(year)!;
    if (!months.has(key)) months.set(key, []);
    months.get(key)!.push(item);
  }

  return [...yearMap.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, months]) => {
      const monthGroups: MonthGroup[] = [...months.entries()]
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([key, monthItems]) => {
          const d = new Date(key + '-01T00:00:00');
          return {
            key,
            label: MONTH_NAMES[d.getMonth()],
            year,
            items: monthItems,
          };
        });

      return {
        year,
        months: monthGroups,
        count: monthGroups.reduce((sum, m) => sum + m.items.length, 0),
      };
    });
}
