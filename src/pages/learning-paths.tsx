import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import paths from '@site/src/data/learning-paths.json';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {titleForLink} from '@site/src/lib/content';

export default function LearningPathsPage(): ReactNode {
  return (
    <Layout title="Learning Paths" description="Curated paths through systems, AI, and backend engineering." wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title="Learning Paths" />
        <div className="grid-2">
          {paths.map((path) => (
            <article key={path.id} className="card-pro path-card path-card--wide">
              <div className="path-card__icon">
                <img src={path.image} alt="" />
              </div>
              <div>
                <p className="path-card__subtitle">{path.subtitle}</p>
                <h2 className="path-card__title">{path.title}</h2>
                <p className="path-card__desc">{path.description}</p>
                <ul className="path-card__links">
                  {path.links.map((link) => (
                    <li key={link}>
                      <Link to={link}>{titleForLink(link)} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
