import Link from '@docusaurus/Link';
import FeaturedArticle from '@site/src/components/FeaturedArticle';
import SocialLinks, {AboutButton} from '@site/src/components/SocialLinks';
import type {ContentItem} from '@site/src/data/content-feed';

type HeroProps = {
  featured: ContentItem;
};

export default function Hero({featured}: HeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ifm-background-color)]/40 to-[var(--ifm-background-color)] pointer-events-none" />

      <div className="relative max-w-shell mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-5 m-0">
              Muhammad Okfriansyah
            </p>
            <h1 className="font-display text-[2rem] sm:text-4xl lg:text-[2.85rem] font-bold leading-[1.08] tracking-tight text-[var(--ifm-font-color-base)] mb-5 m-0 max-w-xl">
              I build autonomous systems that survive production.
            </h1>
            <p className="text-base sm:text-[1.125rem] leading-[1.75] text-muted max-w-xl mb-3 m-0">
              This is my engineering journal — architecture breakdowns, reliability patterns,
              and lessons from shipping deterministic AI pipelines, orchestrators, and
              distributed backends.
            </p>
            <p className="font-mono text-xs text-muted mb-8 m-0">
              New writing is published from real public GitHub work via an automated knowledge pipeline.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <AboutButton />
              <SocialLinks />
            </div>
          </div>

          <div className="lg:col-span-5">
            <FeaturedArticle item={featured} />
          </div>
        </div>
      </div>
    </header>
  );
}
