import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {titleForLink} from '@site/src/lib/content';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function LearningPathsPage(): ReactNode {
  const {learningPaths, contentFeed, ui} = useLocaleData();

  return (
    <Layout
      title={ui.pages.learningPaths.title}
      description={ui.pages.learningPaths.description}
      wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title={ui.pages.learningPaths.title} />
        <div className="grid-2">
          {learningPaths.map((path) => (
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
                      <Link to={link}>
                        {titleForLink(link, contentFeed, ui.common.readArticle)} →
                      </Link>
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
