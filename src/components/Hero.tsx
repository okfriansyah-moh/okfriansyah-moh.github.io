import Link from '@docusaurus/Link';
import FeaturedArticle from '@site/src/components/FeaturedArticle';
import type {ContentItem} from '@site/src/data/content-feed';

type HeroProps = {
  featured: ContentItem;
};

export default function Hero({featured}: HeroProps) {
  return (
    <header className="hero-section relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ifm-background-color)]/40 to-[var(--ifm-background-color)] pointer-events-none" />

      <div className="relative page-shell hero-section__inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="hero-eyebrow font-mono uppercase tracking-[0.22em] text-accent mb-3 m-0">
              Muhammad Okfriansyah
            </p>
            <h1 className="hero-title font-display font-bold leading-[1.08] tracking-tight text-[var(--ifm-font-color-base)] mb-3 m-0 max-w-xl">
              I build autonomous systems that survive production.
            </h1>
            <p className="hero-lead text-muted max-w-xl mb-5 m-0">
              This is my engineering journal — architecture breakdowns, reliability patterns,
              and lessons from shipping deterministic AI pipelines, orchestrators, and
              distributed backends.
            </p>
            <a
              href="#writing"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-white no-underline hover:text-white hover:bg-accent-dark transition-colors duration-200">
              Browse writing
            </a>
          </div>

          <div className="lg:col-span-5">
            <FeaturedArticle item={featured} />
          </div>
        </div>
      </div>
    </header>
  );
}

const WRITING_SCROLL_KEY = 'scroll-to-writing';

export function markWritingScrollIntent(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(WRITING_SCROLL_KEY, '1');
  }
}

export function WritingLinkButton({className = ''}: {className?: string}) {
  return (
    <Link
      to="/"
      onClick={markWritingScrollIntent}
      className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-white no-underline hover:text-white hover:bg-accent-dark transition-colors duration-200 ${className}`}>
      Browse writing
    </Link>
  );
}
