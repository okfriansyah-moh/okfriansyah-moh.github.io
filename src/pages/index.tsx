import {type ReactNode, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
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

  const months = useMemo(() => buildMonthIndex(CONTENT_FEED), []);

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

  return (
    <Layout
      title="AI Systems Engineering Knowledge Hub"
      description="Architecture breakdowns, production patterns, and lessons from building autonomous AI systems — by Muhammad Okfriansyah."
      wrapperClassName="homepage">
      <Hero />

      <div className="flex min-h-[calc(100vh-var(--ifm-navbar-height)-1px)]">
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
          className="lg:hidden fixed bottom-5 left-5 z-50 w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-lg border-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
              className="lg:hidden fixed inset-0 z-40 bg-black/40 border-0 cursor-default"
              aria-label="Close archive overlay"
              onClick={() => setDrawerOpen(false)}
            />
            <TimelineNav
              className="lg:hidden fixed left-0 top-[var(--ifm-navbar-height)] z-50 flex bg-[var(--ifm-background-color)] shadow-xl"
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

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8 lg:py-10 max-w-editorial mx-auto w-full">
          <TypeFilter
            selected={selectedType}
            onSelect={setSelectedType}
            counts={typeCounts}
          />
          <TimelineFeed items={filtered} selectedMonth={selectedMonth} />
        </main>
      </div>
    </Layout>
  );
}
