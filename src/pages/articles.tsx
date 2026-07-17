import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import {
  difficultyForItem,
  difficultyLabel,
  formatArticleDate,
  thumbForItem,
} from '@site/src/lib/content';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function ArticlesPage(): ReactNode {
  const {contentFeed, typeLabels, ui, locale} = useLocaleData();

  return (
    <Layout
      title={ui.pages.articles.title}
      description={ui.pages.articles.description}
      wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <SectionHeading title={ui.pages.articles.title} />
        <div className="article-list">
          {contentFeed.map((item) => (
            <Link key={item.link} to={item.link} className="card-pro article-list__item">
              <div className="article-list__thumb-wrap">
                <img src={thumbForItem(item)} alt="" className="article-list__thumb" />
              </div>
              <div>
                <p className="article-list__meta">
                  {typeLabels[item.type]} · {item.readingTime ?? 5} {ui.common.min} ·{' '}
                  {difficultyLabel(difficultyForItem(item), locale)} ·{' '}
                  {formatArticleDate(item.date, locale)}
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
