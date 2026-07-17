import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeader from '@site/src/components/SectionHeader';
import {CONTACT_LINKS} from '@site/src/data/contact-links';
import {engineeringYearsPlus} from '@site/src/lib/career';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function About(): ReactNode {
  const {about, ui} = useLocaleData();
  const years = engineeringYearsPlus();

  const metrics = about.metrics.map((metric) => ({
    value: metric.valueKey === 'yearsEngineering' ? years : (metric.value ?? ''),
    label: ui.metrics[metric.labelKey as keyof typeof ui.metrics],
  }));

  return (
    <Layout
      title={ui.about.title}
      description={ui.about.metaDescription.replace('{years}', years)}
      wrapperClassName="about-page">
      <div className="about-hero">
        <div className="page-shell section-y max-w-editorial mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 m-0">
            {ui.about.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight m-0 mb-3 max-w-3xl">
            Muhammad Okfriansyah
          </h1>
          <p className="text-xl text-muted m-0 mb-2 max-w-2xl">{ui.about.role}</p>
          <p className="font-mono text-meta text-muted m-0 mb-6">{ui.about.location}</p>
          <p className="text-lg leading-relaxed text-[var(--ifm-font-color-base)] max-w-2xl m-0 mb-8">
            {about.bio.replace('{years}', years)}
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
            {metrics.map(({value, label}) => (
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
            eyebrow={ui.about.experienceEyebrow}
            title={about.experienceTitle.replace('{years}', years)}
            description={ui.about.experienceDescription}
          />
          <div className="about-timeline">
            {about.experience.map((job) => (
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
            eyebrow={ui.about.skillsEyebrow}
            title={ui.about.skillsTitle}
            description={ui.about.skillsDescription}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {about.skills.map(({group, items}) => (
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
          <SectionHeader eyebrow={ui.about.educationEyebrow} title={ui.about.educationTitle} />
          <div className="grid sm:grid-cols-2 gap-4">
            {about.education.map(({school, program, period}) => (
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
            eyebrow={ui.about.principlesEyebrow}
            title={ui.about.principlesTitle}
          />
          <div className="grid gap-4">
            {about.principles.map((p, i) => (
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
          <h2 className="font-display text-2xl font-bold m-0 mb-3">{ui.about.ctaTitle}</h2>
          <p className="text-muted m-0 mb-6 max-w-lg mx-auto">{ui.about.ctaBody}</p>
          <Link to="/articles" className="btn btn-primary">
            {ui.about.ctaButton}
          </Link>
        </section>
      </div>
    </Layout>
  );
}
