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
        'w-[240px] shrink-0 sticky top-[var(--ifm-navbar-height)]',
        'h-[calc(100vh-var(--ifm-navbar-height))] overflow-y-auto',
        'border-r border-border py-8 px-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">
        Archive
      </p>

      <button
        type="button"
        onClick={() => onSelectMonth(null)}
        className={navButtonClass(selectedMonth === null)}>
        <span>All editions</span>
        <span className="font-mono text-[10px] text-muted">{totalCount}</span>
      </button>

      <div className="mt-6 space-y-6">
        {years.map((year) => {
          const yearMonths = months.filter((m) => m.year === year);
          const yearCount = yearMonths.reduce((sum, m) => sum + m.count, 0);

          return (
            <section key={year} aria-labelledby={`year-${year}`}>
              <h2
                id={`year-${year}`}
                className="flex items-center justify-between px-2 mb-2 font-mono text-xs font-semibold text-[var(--ifm-font-color-base)]">
                <span>{year}</span>
                <span className="text-muted font-normal">{yearCount}</span>
              </h2>
              <ul className="space-y-0.5 list-none m-0 p-0">
                {yearMonths.map((m) => (
                  <li key={m.key}>
                    <button
                      type="button"
                      onClick={() => onSelectMonth(m.key === selectedMonth ? null : m.key)}
                      className={navButtonClass(selectedMonth === m.key)}>
                      <span>{m.label}</span>
                      <span className="font-mono text-[10px] text-muted">{m.count}</span>
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
    'flex items-center justify-between w-full px-2 py-1.5 rounded-md text-[13px]',
    'cursor-pointer border-0 bg-transparent transition-colors duration-150',
    'text-left',
    active
      ? 'text-accent font-medium bg-[var(--color-card-hover)]'
      : 'text-muted hover:text-[var(--ifm-font-color-base)] hover:bg-[var(--color-card-hover)]',
  ].join(' ');
}
