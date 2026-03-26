import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Sidebar from '@site/src/components/Sidebar';

type FeedItem = {
  title: string;
  description: string;
  link: string;
  type: 'system' | 'concept' | 'project' | 'blog';
};

const feedItems: FeedItem[] = [
  {
    title: 'MD-AME: Autonomous Media Engine',
    description:
      'Autonomous YouTube production using deterministic pipelines and database-backed state machines.',
    link: '/docs/systems/md-ame-autonomous-media-engine',
    type: 'system',
  },
  {
    title: 'Deterministic AI Pipelines',
    description:
      'Reliable pipeline architecture using idempotent workers and database-backed state machines.',
    link: '/docs/concepts/deterministic-ai-pipelines',
    type: 'concept',
  },
  {
    title: 'Polymarket Trading Agent',
    description:
      'Autonomous prediction market agent with signal processing and risk management.',
    link: '/docs/systems/polymarket-trading-agent',
    type: 'system',
  },
  {
    title: 'AI Orchestration Patterns',
    description:
      'Patterns for coordinating AI workers and models in production.',
    link: '/docs/concepts/ai-orchestration-patterns',
    type: 'concept',
  },
  {
    title: 'LLM Guardrails',
    description:
      'Engineering patterns for constraining LLM behavior in production systems.',
    link: '/docs/concepts/llm-guardrails',
    type: 'concept',
  },
  {
    title: 'Database-Backed State Machines',
    description:
      'Using database state to drive reliable workflow execution in distributed AI systems.',
    link: '/docs/concepts/database-state-machines',
    type: 'concept',
  },
  {
    title: 'MD-AME Project',
    description:
      'Implementation reference for the autonomous media production engine.',
    link: '/docs/projects/md-ame',
    type: 'project',
  },
  {
    title: 'Polymarket Agent Project',
    description:
      'Implementation reference for the autonomous prediction market agent.',
    link: '/docs/projects/polymarket-agent',
    type: 'project',
  },
];

const typeColors: Record<FeedItem['type'], string> = {
  system: 'text-accent',
  concept: 'text-muted',
  project: 'text-muted',
  blog: 'text-accent',
};

const typeLabels: Record<FeedItem['type'], string> = {
  system: 'System',
  concept: 'Concept',
  project: 'Project',
  blog: 'Blog',
};

function FeedCard({title, description, link, type}: FeedItem) {
  return (
    <Link
      to={link}
      className={[
        'block p-5 rounded-card border border-border',
        'bg-[var(--ifm-background-color)]',
        'no-underline text-inherit',
        'hover:border-accent hover:shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
        'hover:-translate-y-[1px] hover:no-underline hover:text-inherit',
        'transition-all duration-150',
      ].join(' ')}>
      <span className={`text-[11px] font-semibold uppercase tracking-wide ${typeColors[type]}`}>
        {typeLabels[type]}
      </span>
      <div className="text-sm font-semibold mt-1.5 mb-1 leading-snug text-[var(--ifm-font-color-base)]">
        {title}
      </div>
      <p className="text-[13px] leading-relaxed text-muted m-0">{description}</p>
    </Link>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="AI Systems Engineering Knowledge Hub"
      description="Autonomous systems, deterministic pipelines, and distributed architecture by Muhammad Okfriansyah."
      wrapperClassName="homepage">
      <div className="flex min-h-[calc(100vh-var(--ifm-navbar-height)-1px)]">
        {/* Desktop sidebar */}
        <Sidebar className="hidden lg:flex" />

        {/* Grid feed */}
        <main className="flex-1 p-5 sm:p-8 max-w-grid mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {feedItems.map((item, i) => (
              <FeedCard key={i} {...item} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
