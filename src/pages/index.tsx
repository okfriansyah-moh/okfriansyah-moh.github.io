import {type ReactNode, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import ArchiveChips from '@site/src/components/ArchiveChips';
import Hero from '@site/src/components/Hero';
import ProfileCard from '@site/src/components/ProfileCard';
import RailArchive from '@site/src/components/RailArchive';
import SectionHeader from '@site/src/components/SectionHeader';
import TimelineFeed from '@site/src/components/TimelineFeed';
import TypeFilter from '@site/src/components/TypeFilter';
import {CONTENT_FEED} from '@site/src/data/content-feed';
import type {ContentType} from '@site/src/data/content-feed';
import {buildMonthIndex, computeHubStats, filterFeed} from '@site/src/lib/feed';

export default function Home(): ReactNode {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all');

  const featured = CONTENT_FEED[0];
  const months = useMemo(() => buildMonthIndex(CONTENT_FEED), []);
  const stats = useMemo(() => computeHubStats(CONTENT_FEED), []);

  const filtered = useMemo(
    () => filterFeed(CONTENT_FEED, selectedType, selectedMonth),
    [selectedType, selectedMonth],
  );

  const typeCounts = useMemo(() => {
    const monthFiltered = filterFeed(CONTENT_FEED, 'all', selectedMonth);
    return {
      all: monthFiltered.length,
      system: monthFiltered.filter((i) => i.type === 'system').length,
      concept: monthFiltered.filter((i) => i.type === 'concept').length,
      project: monthFiltered.filter((i) => i.type === 'project').length,
      blog: monthFiltered.filter((i) => i.type === 'blog').length,
    };
  }, [selectedMonth]);

  const showHeroFeatured = selectedType === 'all' && selectedMonth === null;
  const excludeFromFeed = showHeroFeatured ? [featured.link] : [];

  return (
    <Layout
      title="AI Systems Engineering Knowledge Hub"
      description="Architecture breakdowns, production patterns, and lessons from building autonomous AI systems — by Muhammad Okfriansyah."
      wrapperClassName="homepage">
      <Hero featured={featured} />

      <div
        id="writing"
        className="page-shell section-y scroll-mt-[calc(var(--ifm-navbar-height)+0.5rem)]">
        <div className="flex justify-center gap-10 xl:gap-16">
          <main id="main-content" className="flex-1 min-w-0 max-w-[44rem]">
            <SectionHeader
              eyebrow="Writing"
              title="Engineering editions"
              description="Architecture breakdowns, reusable concepts, and notes from real engineering work."
            />

            <div className="lg:hidden mb-6 space-y-4">
              <ProfileCard stats={stats} variant="strip" />
              <ArchiveChips
                months={months}
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
                totalCount={CONTENT_FEED.length}
              />
              <TypeFilter selected={selectedType} onSelect={setSelectedType} counts={typeCounts} />
            </div>

            <TimelineFeed
              items={filtered}
              selectedMonth={selectedMonth}
              excludeLinks={excludeFromFeed}
            />
          </main>

          <aside
            className="hidden lg:block w-[320px] shrink-0"
            aria-label="Profile and filters">
            <div className="sticky top-[calc(var(--ifm-navbar-height)+1.5rem)] space-y-5">
              <ProfileCard stats={stats} />
              <section className="rail-module" aria-label="Filter by type">
                <p className="rail-module-title m-0 mb-3">Discover by type</p>
                <TypeFilter
                  selected={selectedType}
                  onSelect={setSelectedType}
                  counts={typeCounts}
                  compact
                />
              </section>
              <RailArchive
                months={months}
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
                totalCount={CONTENT_FEED.length}
              />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
