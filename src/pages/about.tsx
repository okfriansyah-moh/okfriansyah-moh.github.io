import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeader from '@site/src/components/SectionHeader';
import {CONTACT_LINKS} from '@site/src/data/contact-links';

const METRICS = [
  {value: '12+', label: 'Years engineering'},
  {value: '98.7% → 99.9%', label: 'Platform SLO'},
  {value: '+70%', label: 'DORA metrics'},
  {value: '−40%', label: 'Cloud cost'},
];

const EXPERIENCE = [
  {
    company: 'Mekari',
    role: 'Engineering Manager — Core & Report Squads',
    period: 'Jan 2025 – Present · Jakarta',
    highlights: [
      'Lead two squads building foundational services, APIs, and data reporting infrastructure for the Mekari Officeless platform.',
      'Directing design and delivery of a fully customizable report builder for the Officeless product suite.',
      'Own team health, delivery velocity, and cross-functional alignment across product and business.',
    ],
  },
  {
    company: 'Mekari',
    role: 'Lead Software Engineer — Financial Services',
    period: 'Apr 2022 – Dec 2024 · Jakarta',
    highlights: [
      'Led Core Payment, Kredigram, KYC, Expense Management, and Banking-as-a-Service teams.',
      'Improved DORA metrics 70% — 90% deployment frequency, ~70% shorter lead time, <1% failure rate, <30 min MTTR — and elevated platform SLO from 98.7% to 99.9%.',
      'Reduced cloud costs ~40% via provider migration; cut resource consumption 50% by rewriting key services in Go.',
      'Integrated Xendit, Midtrans, Ayoconnect, and NIUM payments; standardized H2H banking via SNAP API with BNI, BRI, and Permata.',
      'Maintained 96% code coverage; led the Bank Indonesia PJP Level 3 compliance audit for Kredigram.',
    ],
  },
  {
    company: 'DOKU',
    role: 'Technical Lead Developer — Core Payment',
    period: 'Feb 2016 – Mar 2022 · Jakarta',
    highlights: [
      'Led the Core Payment team for Indonesia\u2019s leading payment gateway — API design and integration for Internet Banking, Virtual Accounts, Credit Cards, Rate Management, and Bank Transfers.',
      'Spearheaded the Jokul platform rewrite as Tech Lead (Angular + Spring Boot/Java), improving scalability, performance, and UX.',
    ],
  },
  {
    company: 'PT Samz Solutions',
    role: 'Java Developer',
    period: 'Nov 2013 – Dec 2015 · Jakarta',
    highlights: [
      'Built ERP modules (Prepaid Revenue Data, POS, Sales Order) for Telkomsel, automating revenue workflows.',
      'Developed Individual Learning Plan and Training Request modules for Pertamina\u2019s e-learning platform.',
    ],
  },
  {
    company: 'KMK Online',
    role: 'Mobile Developer',
    period: 'May 2013 – Sep 2013 · Jakarta',
    highlights: [
      'Managed the SMS gateway for SCTV and Indosiar; developed an SMS verification scheduler and maintained GlassFish servers.',
    ],
  },
];

const SKILLS: Array<{group: string; items: string[]}> = [
  {group: 'Languages', items: ['Go', 'Java', 'TypeScript', 'Swift', 'SQL']},
  {group: 'Frameworks', items: ['Spring Boot', 'Angular', 'Node.js']},
  {
    group: 'Infrastructure',
    items: ['Docker', 'Jenkins', 'Grafana', 'SonarQube', 'Alibaba Cloud'],
  },
  {group: 'Databases', items: ['MySQL', 'PostgreSQL']},
  {
    group: 'Payments',
    items: ['Xendit', 'Midtrans', 'Ayoconnect', 'NIUM', 'BNI/BRI/Permata SNAP API'],
  },
  {
    group: 'Leadership',
    items: ['Engineering Management', 'DORA Metrics', 'OKRs', 'Agile/Scrum', 'Architecture Design'],
  },
];

const EDUCATION = [
  {
    school: 'Universitas Gunadarma',
    program: 'B.S., Informatics Engineering',
    period: '2008 – 2012 · Jakarta',
  },
  {
    school: 'Apple Developer Academy',
    program: '1st Batch',
    period: 'Jun 2018 – Mar 2019 · Jakarta',
  },
];

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

export default function About(): ReactNode {
  return (
    <Layout
      title="About"
      description="Muhammad Okfriansyah — Engineering Manager and AI Systems Architect with 12+ years building payment infrastructure and autonomous systems."
      wrapperClassName="about-page">
      <div className="about-hero">
        <div className="page-shell section-y max-w-editorial mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 m-0">
            About
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight m-0 mb-3 max-w-3xl">
            Muhammad Okfriansyah
          </h1>
          <p className="text-xl text-muted m-0 mb-2 max-w-2xl">
            Engineering Manager · AI Systems Architect
          </p>
          <p className="font-mono text-meta text-muted m-0 mb-6">
            Jakarta, Indonesia — open to US remote
          </p>
          <p className="text-lg leading-relaxed text-[var(--ifm-font-color-base)] max-w-2xl m-0 mb-8">
            Engineering leader with 12+ years of software engineering experience, including 6+
            years leading high-performing fintech and SaaS teams. I ship payment infrastructure
            at scale — payment gateways, banking APIs (SNAP), and KYC systems — and apply that
            reliability discipline to autonomous AI systems: deterministic pipelines,
            orchestrators, and production workflows that don&apos;t break when left unattended.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CONTACT_LINKS.map(({label, href, external}) => (
              <a
                key={label}
                href={href}
                {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-md text-sm font-medium border border-border text-[var(--ifm-font-color-base)] no-underline hover:border-accent hover:text-accent transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {METRICS.map(({value, label}) => (
              <div key={label} className="stat-chip">
                <span className="font-display text-lg sm:text-xl font-bold tabular-nums leading-tight">
                  {value}
                </span>
                <span className="font-mono text-meta text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-shell section-y max-w-editorial mx-auto space-y-14 md:space-y-16">
        <section>
          <SectionHeader
            eyebrow="Experience"
            title="Twelve years, five roles"
            description="From SMS gateways to national payment infrastructure to autonomous AI systems."
          />
          <div className="about-timeline">
            {EXPERIENCE.map((job) => (
              <article key={`${job.company}-${job.role}`} className="about-timeline-item">
                <div className="about-timeline-marker" aria-hidden="true" />
                <div className="pb-8">
                  <h3 className="font-display text-xl font-bold m-0 mb-0.5">
                    {job.company}
                    <span className="font-normal text-muted"> — {job.role}</span>
                  </h3>
                  <p className="font-mono text-meta text-muted m-0 mb-3">{job.period}</p>
                  <ul className="m-0 pl-5 space-y-1.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="text-body-sm leading-relaxed text-[var(--color-ink-soft)]">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Skills"
            title="Core toolkit"
            description="The stack behind payment platforms, distributed backends, and AI pipelines."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {SKILLS.map(({group, items}) => (
              <div key={group} className="card-pro p-5">
                <p className="font-mono text-meta uppercase tracking-[0.14em] text-muted m-0 mb-3">
                  {group}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Education" title="Foundations" />
          <div className="grid sm:grid-cols-2 gap-4">
            {EDUCATION.map(({school, program, period}) => (
              <div key={school} className="card-pro p-5">
                <h3 className="font-display text-lg font-bold m-0 mb-0.5">{school}</h3>
                <p className="m-0 text-body-sm text-[var(--ifm-font-color-base)]">{program}</p>
                <p className="font-mono text-meta text-muted m-0 mt-2">{period}</p>
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

        <section className="card-pro p-8 text-center">
          <h2 className="font-display text-2xl font-bold m-0 mb-3">Read the engineering journal</h2>
          <p className="text-muted m-0 mb-6 max-w-lg mx-auto">
            Architecture breakdowns and patterns from real repositories — updated through an
            automated knowledge pipeline grounded in public GitHub work.
          </p>
          <Link to="/articles" className="btn btn-primary">
            Browse Articles
          </Link>
        </section>
      </div>
    </Layout>
  );
}
