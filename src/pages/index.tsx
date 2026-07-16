import {type ReactNode, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import HubStatsBar, {computeHubStats} from '@site/src/components/HubStatsBar';
import SectionHeader from '@site/src/components/SectionHeader';
import TimelineFeed from '@site/src/components/TimelineFeed';
import TimelineNav from '@site/src/components/TimelineNav';
import TypeFilter from '@site/src/components/TypeFilter';
import {CONTENT_FEED} from '@site/src/data/content-feed';
import type {ContentType} from '@site/src/data/content-feed';
import {buildMonthIndex, filterFeed} from '@site/src/lib/feed';

export default function Home(): ReactNode {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <HubStatsBar stats={stats} />

      <div id="writing" className="flex min-h-[60vh]">
        <TimelineNav
          className="hidden lg:flex"
          months={months}
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
          totalCount={CONTENT_FEED.length}
        />

        <button
          type="button"
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="archive-fab lg:hidden"
          aria-label={drawerOpen ? 'Close archive' : 'Open archive'}
          aria-expanded={drawerOpen}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {drawerOpen && (
          <>
            <button
              type="button"
              className="drawer-scrim lg:hidden"
              aria-label="Close archive overlay"
              onClick={() => setDrawerOpen(false)}
            />
            <TimelineNav
              className="lg:hidden fixed left-0 top-[var(--ifm-navbar-height)] z-50 flex bg-[var(--ifm-background-color)] shadow-2xl"
              months={months}
              selectedMonth={selectedMonth}
              onSelectMonth={(key) => {
                setSelectedMonth(key);
                setDrawerOpen(false);
              }}
              totalCount={CONTENT_FEED.length}
            />
          </>
        )}

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-10 lg:py-12 max-w-shell mx-auto w-full">
          <SectionHeader
            eyebrow="Writing"
            title="Engineering editions"
            description="Browse by year and month, or filter by systems architecture, reusable concepts, and blog notes."
          />
          <TypeFilter selected={selectedType} onSelect={setSelectedType} counts={typeCounts} />
          <TimelineFeed
            items={filtered}
            selectedMonth={selectedMonth}
            excludeLinks={excludeFromFeed}
          />
        </main>
      </div>
    </Layout>
  );
}
