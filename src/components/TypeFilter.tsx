import type {ContentType} from '@site/src/data/content-feed';
import {TYPE_FILTERS} from '@site/src/data/content-feed';

type TypeFilterProps = {
  selected: ContentType | 'all';
  onSelect: (type: ContentType | 'all') => void;
  counts: Record<ContentType | 'all', number>;
  compact?: boolean;
};

export default function TypeFilter({selected, onSelect, counts, compact = false}: TypeFilterProps) {
  return (
    <div
      className={compact ? 'flex flex-wrap gap-2' : 'filter-bar'}
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
              'filter-pill',
              compact ? 'filter-pill--compact' : '',
              active ? 'filter-pill-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}>
            <span>{label}</span>
            <span className="count-badge">{counts[id]}</span>
          </button>
        );
      })}
    </div>
  );
}
