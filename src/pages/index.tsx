import {type ReactNode, useState, useMemo} from 'react';
import Layout from '@theme/Layout';
import Card, {type CardItem} from '@site/src/components/Card';
import Sidebar from '@site/src/components/Sidebar';

/* ──────────────────────────────────────────
   Unified content feed — blog + docs merged.
   Sorted latest-first. Dates on docs are
   approximate publish dates.
   ────────────────────────────────────────── */
const feedItems: CardItem[] = [
  {
    title: 'Welcome to the AI Systems Engineering Knowledge Hub',
    description:
      'Introduction to this engineering knowledge base — what it covers and what\'s coming.',
    link: '/blog/2025/03/26/welcome',
    type: 'blog',
    date: '2025-03-26',
  },
  {
    title: 'MD-AME: Autonomous Media Engine',
    description:
      'Autonomous YouTube production using deterministic pipelines and database-backed state machines.',
    link: '/docs/systems/md-ame-autonomous-media-engine',
    type: 'system',
    date: '2025-03-20',
  },
  {
    title: 'Polymarket Trading Agent',
    description:
      'Autonomous prediction market agent with signal processing and risk management.',
    link: '/docs/systems/polymarket-trading-agent',
    type: 'system',
    date: '2025-03-18',
  },
  {
    title: 'Deterministic AI Pipelines',
    description:
      'Reliable pipeline architecture using idempotent workers and database-backed state machines.',
    link: '/docs/concepts/deterministic-ai-pipelines',
    type: 'concept',
    date: '2025-03-15',
  },
  {
    title: 'Database-Backed State Machines',
    description:
      'Using database state to drive reliable workflow execution in distributed AI systems.',
    link: '/docs/concepts/database-state-machines',
    type: 'concept',
    date: '2025-03-12',
  },
  {
    title: 'AI Orchestration Patterns',
    description:
      'Patterns for coordinating AI workers, models, and pipelines in production environments.',
    link: '/docs/concepts/ai-orchestration-patterns',
    type: 'concept',
    date: '2025-03-10',
  },
  {
    title: 'LLM Guardrails',
    description:
      'Engineering patterns for constraining LLM behavior in production AI systems.',
    link: '/docs/concepts/llm-guardrails',
    type: 'concept',
    date: '2025-03-08',
  },
  {
    title: 'MD-AME Project',
    description:
      'Implementation reference for the autonomous media production engine.',
    link: '/docs/projects/md-ame',
    type: 'project',
    date: '2025-03-20',
  },
  {
    title: 'Polymarket Agent Project',
    description:
      'Implementation reference for the autonomous prediction market trading agent.',
    link: '/docs/projects/polymarket-agent',
    type: 'project',
    date: '2025-03-18',
  },
];

/* ──────────────────────────────────────────
   Helpers
   ────────────────────────────────────────── */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function buildMonths(items: CardItem[]) {
  const map = new Map<string, {label: string; year: number; count: number}>();
  for (const item of items) {
    const d = new Date(item.date + 'T00:00:00');
    const year = d.getFullYear();
    const month = d.getMonth();
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;
    if (!map.has(key)) {
      map.set(key, {label: MONTH_NAMES[month], year, count: 0});
    }
    map.get(key)!.count++;
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, val]) => ({key, ...val}));
}

/* ──────────────────────────────────────────
   Homepage
   ────────────────────────────────────────── */
export default function Home(): ReactNode {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const months = useMemo(() => buildMonths(feedItems), []);

  const filtered = useMemo(() => {
    if (!selectedMonth) return feedItems;
    return feedItems.filter((item) => {
      const d = new Date(item.date + 'T00:00:00');
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      return key === selectedMonth;
    });
  }, [selectedMonth]);

  return (
    <Layout
      title="AI Systems Engineering Knowledge Hub"
      description="Autonomous systems, deterministic pipelines, and distributed architecture by Muhammad Okfriansyah."
      wrapperClassName="homepage">
      <div className="flex min-h-[calc(100vh-var(--ifm-navbar-height)-1px)]">
        {/* Desktop sidebar */}
        <Sidebar
          className="hidden lg:flex"
          months={months}
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
        />

        {/* Mobile drawer toggle */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="lg:hidden fixed bottom-4 left-4 z-50 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg border-0 cursor-pointer"
          aria-label="Toggle sidebar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Mobile drawer overlay */}
        {drawerOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/30"
              onClick={() => setDrawerOpen(false)}
            />
            <Sidebar
              className="lg:hidden fixed left-0 top-[var(--ifm-navbar-height)] z-50 flex bg-[var(--ifm-background-color)]"
              months={months}
              selectedMonth={selectedMonth}
              onSelectMonth={(key) => {
                setSelectedMonth(key);
                setDrawerOpen(false);
              }}
            />
          </>
        )}

        {/* Card grid feed */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-grid mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <Card key={item.link} {...item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted py-20 text-sm">
              No content for this period.
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
