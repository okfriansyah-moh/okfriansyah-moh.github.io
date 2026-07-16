import Link from '@docusaurus/Link';

const SOCIAL = [
  {label: 'GitHub', href: 'https://github.com/okfriansyah-moh'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-okfriansyah-74092671'},
] as const;

export default function Hero() {
  return (
    <header className="border-b border-border bg-surface/50">
      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
          AI Systems Engineering · Knowledge Hub
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-[var(--ifm-font-color-base)] mb-4 max-w-3xl">
          Engineering knowledge from systems that ship.
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted max-w-2xl mb-6">
          Architecture breakdowns, production patterns, and lessons from building autonomous
          pipelines — written for engineers who care about reliability first. New articles are
          published from real public GitHub work.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium bg-accent text-white no-underline hover:text-white hover:bg-accent-dark transition-colors duration-200">
            About me
          </Link>
          {SOCIAL.map(({label, href}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium border border-border text-[var(--ifm-font-color-base)] no-underline hover:border-accent hover:text-accent transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
