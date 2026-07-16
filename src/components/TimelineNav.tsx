import type {MonthEntry} from '@site/src/lib/feed';

type TimelineNavProps = {
  className?: string;
  months: MonthEntry[];
  selectedMonth: string | null;
  onSelectMonth: (key: string | null) => void;
  totalCount: number;
};

export default function TimelineNav({
  className,
  months,
  selectedMonth,
  onSelectMonth,
  totalCount,
}: TimelineNavProps) {
  const years = [...new Set(months.map((m) => m.year))].sort((a, b) => b - a);

  return (
    <nav
      aria-label="Browse by date"
      className={[
        'w-[min(260px,22vw)] shrink-0 sticky top-[var(--ifm-navbar-height)]',
        'h-[calc(100dvh-var(--ifm-navbar-height))] overflow-y-auto',
        'border-r border-border py-6 px-4 xl:py-8 xl:px-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-5 m-0">
        Archive
      </p>

      <button
        type="button"
        onClick={() => onSelectMonth(null)}
        className={navButtonClass(selectedMonth === null)}>
        <span>All editions</span>
        <span className="count-badge">{totalCount}</span>
      </button>

      <div className="mt-8 space-y-8 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-border">
        {years.map((year) => {
          const yearMonths = months.filter((m) => m.year === year);
          const yearCount = yearMonths.reduce((sum, m) => sum + m.count, 0);

          return (
            <section key={year} aria-labelledby={`year-${year}`} className="relative">
              <h2
                id={`year-${year}`}
                className="flex items-center justify-between pl-0 pr-2 mb-3 font-display text-base font-bold text-[var(--ifm-font-color-base)] m-0">
                <span>{year}</span>
                <span className="count-badge">{yearCount}</span>
              </h2>
              <ul className="space-y-1 list-none m-0 p-0 pl-4 border-l border-border ml-1">
                {yearMonths.map((m) => (
                  <li key={m.key}>
                    <button
                      type="button"
                      onClick={() => onSelectMonth(m.key === selectedMonth ? null : m.key)}
                      className={navButtonClass(selectedMonth === m.key)}>
                      <span>{m.label}</span>
                      <span className="count-badge">{m.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </nav>
  );
}

function navButtonClass(active: boolean): string {
  return [
    'flex items-center justify-between w-full px-2.5 py-2 rounded-md text-sm',
    'cursor-pointer border-0 bg-transparent transition-colors duration-150 text-left min-h-[44px]',
    active
      ? 'text-accent font-medium bg-[var(--color-card-hover)]'
      : 'text-muted hover:text-[var(--ifm-font-color-base)] hover:bg-[var(--color-card-hover)]',
  ].join(' ');
}
