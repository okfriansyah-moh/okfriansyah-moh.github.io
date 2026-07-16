import type {MonthEntry} from '@site/src/lib/feed';

type ArchiveChipsProps = {
  months: MonthEntry[];
  selectedMonth: string | null;
  onSelectMonth: (key: string | null) => void;
  totalCount: number;
};

export default function ArchiveChips({
  months,
  selectedMonth,
  onSelectMonth,
  totalCount,
}: ArchiveChipsProps) {
  const recentMonths = months.slice(0, 8);

  return (
    <nav
      aria-label="Quick archive filter"
      className="archive-chips md:flex lg:hidden flex-wrap items-center gap-2 mb-6">
      <button
        type="button"
        onClick={() => onSelectMonth(null)}
        className={chipClass(selectedMonth === null)}>
        All
        <span className="count-badge">{totalCount}</span>
      </button>
      {recentMonths.map((month) => (
        <button
          key={month.key}
          type="button"
          onClick={() => onSelectMonth(month.key === selectedMonth ? null : month.key)}
          className={chipClass(selectedMonth === month.key)}>
          {month.label.slice(0, 3)} {month.year}
          <span className="count-badge">{month.count}</span>
        </button>
      ))}
    </nav>
  );
}

function chipClass(active: boolean): string {
  return [
    'inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-full',
    'border text-sm font-medium font-ui transition-colors duration-150',
    active
      ? 'bg-accent border-accent text-white'
      : 'border-border text-muted hover:border-accent hover:text-accent bg-transparent',
  ].join(' ');
}
