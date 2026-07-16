import type {ContentType} from '@site/src/data/content-feed';
import {TYPE_FILTERS} from '@site/src/data/content-feed';

type TypeFilterProps = {
  selected: ContentType | 'all';
  onSelect: (type: ContentType | 'all') => void;
  counts: Record<ContentType | 'all', number>;
};

export default function TypeFilter({selected, onSelect, counts}: TypeFilterProps) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter by content type">
      {TYPE_FILTERS.map(({id, label}) => {
        const active = selected === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(id)}
            className={['filter-pill', active ? 'filter-pill-active' : ''].filter(Boolean).join(' ')}>
            <span>{label}</span>
            <span className="count-badge">{counts[id]}</span>
          </button>
        );
      })}
    </div>
  );
}
