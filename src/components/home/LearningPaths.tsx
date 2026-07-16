import Link from '@docusaurus/Link';
import paths from '@site/src/data/learning-paths.json';
import SectionHeading from '@site/src/components/ui/SectionHeading';

export default function LearningPaths() {
  return (
    <section className="page-shell home-section" id="learning-paths">
      <SectionHeading title="Learning Paths" viewAllHref="/learning-paths" />
      <div className="grid-4">
        {paths.map((path) => (
          <Link key={path.id} to={path.links[0]} className="card-pro path-card">
            <div className="path-card__icon">
              <img src={path.image} alt="" loading="lazy" />
            </div>
            <p className="path-card__subtitle">{path.subtitle}</p>
            <h3 className="path-card__title">{path.title}</h3>
            <p className="path-card__desc">{path.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
