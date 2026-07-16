import {useEffect, useState} from 'react';
import type {MonthEntry} from '@site/src/lib/feed';

const STORAGE_KEY = 'archive-expanded';

type RailArchiveProps = {
  months: MonthEntry[];
  selectedMonth: string | null;
  onSelectMonth: (key: string | null) => void;
  totalCount: number;
};

export default function RailArchive({
  months,
  selectedMonth,
  onSelectMonth,
  totalCount,
}: RailArchiveProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(localStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
  };

  const years = [...new Set(months.map((m) => m.year))].sort((a, b) => b - a);
  const visibleYears = expanded ? years : years.slice(0, 1);

  return (
    <section className="rail-module" aria-label="Archive">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className="archive-collapse-toggle">
        <span className="rail-module-title">Archive</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`archive-chevron ${expanded ? 'archive-chevron--open' : ''}`}>
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onSelectMonth(null)}
        className={archiveButtonClass(selectedMonth === null)}>
        <span>All editions</span>
        <span className="count-badge">{totalCount}</span>
      </button>

      {visibleYears.map((year) => {
        const yearMonths = months.filter((m) => m.year === year);
        return (
          <div key={year} className="mt-3">
            <p className="font-display text-sm font-bold m-0 mb-1.5">{year}</p>
            <ul className="list-none m-0 p-0 pl-2.5 border-l border-border space-y-0.5">
              {yearMonths.map((m) => (
                <li key={m.key}>
                  <button
                    type="button"
                    onClick={() => onSelectMonth(m.key === selectedMonth ? null : m.key)}
                    className={archiveButtonClass(selectedMonth === m.key)}>
                    <span>{m.label}</span>
                    <span className="count-badge">{m.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {!expanded && years.length > 1 && (
        <button type="button" onClick={toggle} className="archive-show-more">
          Show {years.length - 1} more {years.length - 1 === 1 ? 'year' : 'years'}
        </button>
      )}
    </section>
  );
}

function archiveButtonClass(active: boolean): string {
  return [
    'flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm font-ui',
    'cursor-pointer border-0 bg-transparent transition-colors duration-150 text-left min-h-[36px]',
    active
      ? 'text-accent font-medium bg-[var(--color-card-hover)]'
      : 'text-muted hover:text-[var(--ifm-font-color-base)] hover:bg-[var(--color-card-hover)]',
  ].join(' ');
}
