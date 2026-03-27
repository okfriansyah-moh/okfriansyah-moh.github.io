import Link from '@docusaurus/Link';

export type CardItem = {
  title: string;
  description: string;
  link: string;
  type: 'system' | 'concept' | 'project' | 'blog';
  date: string;
  image?: string;
};

const typeLabels: Record<CardItem['type'], string> = {
  system: 'SYSTEM',
  concept: 'CONCEPT',
  project: 'PROJECT',
  blog: 'BLOG',
};

const typeGradients: Record<CardItem['type'], string> = {
  system: 'from-red-900 to-red-700',
  concept: 'from-slate-800 to-slate-600',
  project: 'from-zinc-800 to-zinc-600',
  blog: 'from-rose-900 to-rose-700',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

export default function Card({title, description, link, type, date, image}: CardItem) {
  return (
    <Link
      to={link}
      className="block rounded-card border border-border overflow-hidden no-underline text-inherit hover:border-accent hover:no-underline hover:text-inherit transition-all duration-150 group">
      {/* Thumbnail */}
      <div className="h-36 relative overflow-hidden bg-surface">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${typeGradients[type]} flex items-end p-4`}>
            <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              {typeLabels[type]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-[var(--ifm-background-color)]">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
            {typeLabels[type]}
          </span>
          <span className="text-[11px] text-muted">·</span>
          <span className="text-[11px] text-muted">{formatDate(date)}</span>
        </div>
        <div className="text-sm font-semibold leading-snug text-[var(--ifm-font-color-base)] mb-1">
          {title}
        </div>
        <p className="text-[13px] leading-relaxed text-muted m-0 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
