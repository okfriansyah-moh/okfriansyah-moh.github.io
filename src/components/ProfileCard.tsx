import Link from '@docusaurus/Link';
import type {HubStats} from '@site/src/lib/feed';

type ProfileCardProps = {
  stats: HubStats;
  variant?: 'rail' | 'strip';
};

const BIO =
  'Engineering leader with 12+ years shipping payment infrastructure and autonomous AI systems. New writing is published from real public GitHub work.';

const SOCIALS = [
  {label: 'GitHub', href: 'https://github.com/okfriansyah-moh'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-okfriansyah-74092671'},
] as const;

export default function ProfileCard({stats, variant = 'rail'}: ProfileCardProps) {
  const statChips = [
    {label: 'Articles', value: stats.total},
    {label: 'Systems', value: stats.systems},
    {label: 'Years', value: stats.years},
  ];

  if (variant === 'strip') {
    return (
      <div className="profile-strip">
        <span className="profile-avatar profile-avatar--sm" aria-hidden="true">
          MO
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold m-0 leading-tight">
            Muhammad Okfriansyah
          </p>
          <p className="font-mono text-meta text-muted m-0">
            AI Systems Architect · Engineering Manager
          </p>
        </div>
        <Link to="/about" className="profile-strip-link">
          About →
        </Link>
      </div>
    );
  }

  return (
    <section className="profile-card" aria-label="Author profile">
      <div className="flex items-center gap-3.5 mb-4">
        <span className="profile-avatar" aria-hidden="true">
          MO
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold m-0 leading-tight">
            Muhammad Okfriansyah
          </p>
          <p className="font-mono text-meta text-muted m-0 mt-0.5">
            AI Systems Architect · EM
          </p>
        </div>
      </div>

      <p className="text-body-sm leading-relaxed text-muted m-0 mb-4">{BIO}</p>

      <div className="flex items-center gap-5 pb-4 mb-4 border-b border-border">
        {statChips.map(({label, value}) => (
          <div key={label} className="flex flex-col">
            <span className="font-display text-lg font-bold leading-none tabular-nums">
              {value}
            </span>
            <span className="font-mono text-meta text-muted mt-1">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {SOCIALS.map(({label, href}) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[40px] px-3.5 rounded-full text-sm font-medium font-ui border border-border text-[var(--ifm-font-color-base)] no-underline hover:border-accent hover:text-accent transition-colors duration-150">
            {label}
          </a>
        ))}
      </div>

      <Link
        to="/about"
        className="inline-flex items-center gap-1 font-mono text-meta text-accent no-underline hover:underline">
        More about me →
      </Link>
    </section>
  );
}
