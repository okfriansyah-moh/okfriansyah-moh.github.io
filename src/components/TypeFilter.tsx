import type {ContentType} from '@site/src/data/content-feed';
import {TYPE_FILTERS} from '@site/src/data/content-feed';

type TypeFilterProps = {
  selected: ContentType | 'all';
  onSelect: (type: ContentType | 'all') => void;
  counts: Record<ContentType | 'all', number>;
};

export default function TypeFilter({selected, onSelect, counts}: TypeFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2 mb-8"
      role="tablist"
      aria-label="Filter by content type">
      {TYPE_FILTERS.map(({id, label}) => {
        const active = selected === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(id)}
            className={[
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
              'border cursor-pointer transition-colors duration-150',
              active
                ? 'bg-accent text-white border-accent'
                : 'bg-transparent text-muted border-border hover:border-accent hover:text-accent',
            ].join(' ')}>
            {label}
            <span
              className={[
                'font-mono text-[10px]',
                active ? 'text-white/80' : 'text-muted',
              ].join(' ')}>
              {counts[id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
