import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {CONTENT_FEED} from '@site/src/data/content-feed';
import {formatArticleDate, thumbForItem} from '@site/src/lib/content';

export default function CaseStudiesPage(): ReactNode {
  const cases = CONTENT_FEED.filter((i) => i.type === 'system');

  return (
    <Layout title="Case Studies" description="Deep-dive system architecture case studies." wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title="Case Studies" />
        <div className="grid-3">
          {cases.map((item) => (
            <Link key={item.link} to={item.link} className="card-pro case-card">
              <div className="case-card__thumb">
                <img src={thumbForItem(item)} alt="" />
              </div>
              <h2 className="case-card__title">{item.title}</h2>
              <p className="case-card__desc">{item.description}</p>
              <span className="case-card__date">{formatArticleDate(item.date)}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
