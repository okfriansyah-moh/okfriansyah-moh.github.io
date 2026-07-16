import projects from '@site/src/data/projects-building.json';
import SectionHeading from '@site/src/components/ui/SectionHeading';

type Project = (typeof projects)[number];

function ProjectCard({project}: {project: Project}) {
  return (
    <article className="card-pro project-card">
      <div className="project-card__head">
        <span className="project-card__status" aria-label="Active project" />
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
        GitHub ↗
      </a>
    </article>
  );
}

export default function CurrentlyBuilding() {
  return (
    <section className="page-shell home-section" id="building">
      <SectionHeading title="Currently Building" viewAllHref="/projects" />
      <div className="grid-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
