import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function LearningPaths() {
  const {learningPaths, ui} = useLocaleData();

  return (
    <section className="page-shell home-section" id="learning-paths">
      <SectionHeading title={ui.sections.learningPaths} viewAllHref="/learning-paths" />
      <div className="grid-4">
        {learningPaths.map((path) => (
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
