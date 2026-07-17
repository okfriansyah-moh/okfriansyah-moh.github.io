import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {CONTENT_FEED} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {difficultyForItem, formatArticleDate, thumbForItem} from '@site/src/lib/content';

export default function ArticlesPage(): ReactNode {
  return (
    <Layout title="Articles" description="All engineering articles and notes." wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title="Articles" />
        <div className="article-list">
          {CONTENT_FEED.map((item) => (
            <Link key={item.link} to={item.link} className="card-pro article-list__item">
              <div className="article-list__thumb-wrap">
                <img src={thumbForItem(item)} alt="" className="article-list__thumb" />
              </div>
              <div>
                <p className="article-list__meta">
                  {TYPE_LABELS[item.type]} · {item.readingTime ?? 5} min · {difficultyForItem(item)} ·{' '}
                  {formatArticleDate(item.date)}
                </p>
                <h2 className="article-list__title">{item.title}</h2>
                <p className="article-list__desc">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
