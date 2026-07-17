import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {formatArticleDate, thumbForItem} from '@site/src/lib/content';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function CaseStudiesPage(): ReactNode {
  const {contentFeed, ui, locale} = useLocaleData();
  const cases = contentFeed.filter((i) => i.type === 'system');

  return (
    <Layout
      title={ui.pages.caseStudies.title}
      description={ui.pages.caseStudies.description}
      wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title={ui.pages.caseStudies.title} />
        <div className="grid-3">
          {cases.map((item) => (
            <Link key={item.link} to={item.link} className="card-pro case-card">
              <div className="case-card__thumb">
                <img src={thumbForItem(item)} alt="" />
              </div>
              <h2 className="case-card__title">{item.title}</h2>
              <p className="case-card__desc">{item.description}</p>
              <span className="case-card__date">{formatArticleDate(item.date, locale)}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
