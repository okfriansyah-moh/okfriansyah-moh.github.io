import SectionHeading from '@site/src/components/ui/SectionHeading';
import {useLocaleData} from '@site/src/lib/locale-data';
import type {BuildingProject} from '@site/src/lib/locale-data';

function ProjectCard({project, labels}: {project: BuildingProject; labels: {github: string; activeProject: string}}) {
  return (
    <article className="card-pro project-card">
      <div className="project-card__head">
        <span className="project-card__status" aria-label={labels.activeProject} />
        <h3 className="project-card__title">{project.title}</h3>
      </div>
      <p className="project-card__desc">{project.description}</p>
      <div className="tag-row">
        {project.tech.map((t) => (
          <span key={t} className="tag-pill">
            {t}
          </span>
        ))}
      </div>
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card__link">
        {labels.github} ↗
      </a>
    </article>
  );
}

export default function CurrentlyBuilding() {
  const {projectsBuilding, ui} = useLocaleData();

  return (
    <section className="page-shell home-section" id="building">
      <SectionHeading title={ui.sections.currentlyBuilding} viewAllHref="/projects" />
      <div className="grid-3">
        {projectsBuilding.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            labels={{github: ui.common.github, activeProject: ui.common.activeProject}}
          />
        ))}
      </div>
    </section>
  );
}
