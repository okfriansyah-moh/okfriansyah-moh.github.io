import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import SocialLinks, {AboutButton} from '@site/src/components/SocialLinks';
import SectionHeader from '@site/src/components/SectionHeader';

const PRINCIPLES = [
  {
    title: 'Deterministic over probabilistic',
    body: 'Given the same input, produce the same output. Pipelines must be reproducible.',
  },
  {
    title: 'Idempotent operations',
    body: 'Every worker, stage, and retry produces the same result without compounding side effects.',
  },
  {
    title: 'Database-backed state',
    body: 'The database is the single source of truth. No in-memory-only state for what matters.',
  },
  {
    title: 'Orchestrator over agent chaos',
    body: 'A central coordinator owns execution flow. Workers stay stateless and replaceable.',
  },
];

const FOCUS = [
  'Deterministic AI pipelines',
  'Autonomous orchestration',
  'Distributed backend systems',
  'Payment & fintech infrastructure',
  'LLM guardrails & reliability',
];

export default function About(): ReactNode {
  return (
    <Layout
      title="About"
      description="Muhammad Okfriansyah — AI Systems Architect building reliable autonomous systems and deterministic pipelines."
      wrapperClassName="about-page">
      <div className="about-hero">
        <div className="max-w-content mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 m-0">
            About
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight m-0 mb-4 max-w-3xl">
            Muhammad Okfriansyah
          </h1>
          <p className="text-xl text-muted m-0 mb-6 max-w-2xl">
            AI Systems Architect · Engineering Manager
          </p>
          <p className="text-lg leading-relaxed text-[var(--ifm-font-color-base)] max-w-2xl m-0 mb-8">
            Twelve years building backend systems, payment infrastructure, and distributed
            architectures at scale. I apply that reliability discipline to autonomous AI
            systems — deterministic pipelines, orchestrators, and production workflows that
            do not break when left unattended.
          </p>
          <div className="flex flex-wrap gap-3">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        <section>
          <SectionHeader
            eyebrow="Focus"
            title="What I build"
            description="Systems where reliability comes first and intelligence is earned through structure."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {FOCUS.map((item) => (
              <div key={item} className="card-surface p-5">
                <p className="font-display text-lg font-semibold m-0 text-[var(--ifm-font-color-base)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Principles"
            title="Engineering constraints I enforce"
          />
          <div className="grid gap-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="principle-row">
                <span className="principle-index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold m-0 mb-1">{p.title}</h3>
                  <p className="text-muted m-0 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Experience" title="Selected trajectory" />
          <div className="space-y-6">
            <article className="card-surface p-6">
              <h3 className="font-display text-xl font-bold m-0 mb-1">Mekari — Engineering Manager</h3>
              <p className="font-mono text-xs text-muted m-0 mb-4">2022 – Present · Jakarta</p>
              <p className="m-0 leading-relaxed text-[var(--ifm-font-color-base)]">
                Leading core platform and reporting teams. Previously owned payment processing,
                KYC, and banking integrations — improving SLO from 98.7% to 99.9%, deployment
                frequency by 90%, and infrastructure cost by ~40%.
              </p>
            </article>
            <article className="card-surface p-6">
              <h3 className="font-display text-xl font-bold m-0 mb-1">DOKU — Technical Lead</h3>
              <p className="font-mono text-xs text-muted m-0 mb-4">2016 – 2022 · Jakarta</p>
              <p className="m-0 leading-relaxed text-[var(--ifm-font-color-base)]">
                Led core payment systems for Indonesia&apos;s leading payment gateway and initiated
                the Jokul platform rewrite with 96% code coverage and rigorous quality gates.
              </p>
            </article>
          </div>
        </section>

        <section className="card-surface p-8 text-center">
          <h2 className="font-display text-2xl font-bold m-0 mb-3">Read the engineering journal</h2>
          <p className="text-muted m-0 mb-6 max-w-lg mx-auto">
            Architecture breakdowns and patterns from real repositories — updated through an
            automated knowledge pipeline grounded in public GitHub work.
          </p>
          <a href="/" className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-white no-underline hover:text-white hover:bg-accent-dark transition-colors duration-200">
            Browse editions
          </a>
        </section>
      </div>
    </Layout>
  );
}
