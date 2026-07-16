import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import projects from '@site/src/data/projects-building.json';
import SectionHeading from '@site/src/components/ui/SectionHeading';

export default function ProjectsPage(): ReactNode {
  return (
    <Layout title="Projects" description="Open source and active engineering projects." wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title="Projects" />
        <div className="grid-3">
          {projects.map((p) => (
            <article key={p.id} className="card-pro project-card">
              <h2 className="project-card__title">{p.title}</h2>
              <p className="project-card__desc">{p.description}</p>
              <div className="tag-row">
                {p.tech.map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="project-card__link">
                GitHub ↗
              </a>
            </article>
          ))}
        </div>
        <p className="hub-page__more">
          <Link to="/docs/projects/md-ame">View project docs →</Link>
        </p>
      </div>
    </Layout>
  );
}
