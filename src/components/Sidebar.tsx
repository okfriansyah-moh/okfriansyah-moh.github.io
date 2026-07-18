import {useState} from 'react';
import Link from '@docusaurus/Link';

type MonthEntry = {
  key: string;   // "2025-03"
  label: string; // "March"
  year: number;
  count: number;
};

type SidebarProps = {
  className?: string;
  months: MonthEntry[];
  selectedMonth: string | null;
  onSelectMonth: (key: string | null) => void;
};

export default function Sidebar({className, months, selectedMonth, onSelectMonth}: SidebarProps) {
  const years = [...new Set(months.map((m) => m.year))].sort((a, b) => b - a);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const toggle = (year: number) =>
    setCollapsed((prev) => ({...prev, [year]: !prev[year]}));

  return (
    <aside
      className={[
        'w-[220px] shrink-0 sticky top-[var(--ifm-navbar-height)]',
        'h-[calc(100vh-var(--ifm-navbar-height))] overflow-y-auto',
        'border-r border-border flex flex-col',
        'py-6 px-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}>
      {/* Time Navigation */}
      <div className="flex-1">
        <button
          onClick={() => onSelectMonth(null)}
          className={[
            'block w-full text-left px-2 py-1.5 text-[13px] font-medium rounded-md mb-2',
            'transition-colors duration-100 cursor-pointer',
            'border-0 bg-transparent',
            selectedMonth === null
              ? 'text-accent bg-[var(--color-card-hover)]'
              : 'text-[var(--ifm-font-color-base)] hover:bg-[var(--color-card-hover)] hover:text-accent',
          ].join(' ')}>
          All
        </button>

        {years.map((year) => {
          const yearMonths = months.filter((m) => m.year === year);
          const isCollapsed = collapsed[year] ?? false;

          return (
            <div key={year} className="mb-1">
              <button
                onClick={() => toggle(year)}
                className={[
                  'flex items-center justify-between w-full px-2 py-1.5',
                  'text-[12px] font-semibold text-[var(--ifm-font-color-base)]',
                  'rounded-md cursor-pointer border-0 bg-transparent',
                  'hover:bg-[var(--color-card-hover)] transition-colors duration-100',
                ].join(' ')}>
                <span>{year}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-150 ${isCollapsed ? '-rotate-90' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {!isCollapsed && (
                <div className="ml-1 mt-0.5">
                  {yearMonths.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => onSelectMonth(m.key === selectedMonth ? null : m.key)}
                      className={[
                        'flex items-center justify-between w-full px-2 py-1 text-[12px] rounded-md',
                        'cursor-pointer border-0 bg-transparent transition-colors duration-100',
                        selectedMonth === m.key
                          ? 'text-accent font-medium bg-[var(--color-card-hover)]'
                          : 'text-muted hover:text-[var(--ifm-font-color-base)] hover:bg-[var(--color-card-hover)]',
                      ].join(' ')}>
                      <span>{m.label}</span>
                      <span className="text-[10px] text-muted">{m.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
