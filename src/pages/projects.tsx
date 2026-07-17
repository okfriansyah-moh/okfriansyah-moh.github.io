import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function ProjectsPage(): ReactNode {
  const {projectsBuilding, ui} = useLocaleData();

  return (
    <Layout
      title={ui.pages.projects.title}
      description={ui.pages.projects.description}
      wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title={ui.pages.projects.title} />
        <div className="grid-3">
          {projectsBuilding.map((p) => (
            <article key={p.id} className="card-pro project-card">
              <h2 className="project-card__title">{p.title}</h2>
              <p className="project-card__desc">{p.description}</p>
              <div className="tag-row">
                {p.tech.map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="project-card__link">
                {ui.common.github} ↗
              </a>
            </article>
          ))}
        </div>
        <p className="hub-page__more">
          <Link to="/docs/projects/md-ame">{ui.pages.projects.viewDocs}</Link>
        </p>
      </div>
    </Layout>
  );
}
