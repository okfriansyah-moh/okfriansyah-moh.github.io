import Link from '@docusaurus/Link';
import type {ContentItem} from '@site/src/data/content-feed';
import {
  difficultyForItem,
  difficultyLabel,
  formatArticleDate,
} from '@site/src/lib/content';
import {useLocaleData} from '@site/src/lib/locale-data';

type FeaturedArticleCardProps = {
  item: ContentItem;
};

export default function FeaturedArticleCard({item}: FeaturedArticleCardProps) {
  const {typeLabels, ui, locale} = useLocaleData();
  const difficulty = difficultyForItem(item);

  return (
    <section className="page-shell home-section" id="featured">
      <article className="card-pro featured-card">
        <div className="featured-card__body">
          <span className="badge badge-featured">{ui.common.featuredBadge}</span>
          <p className="featured-card__meta">
            {typeLabels[item.type]} · {item.readingTime ?? 5} {ui.common.minRead} ·{' '}
            {difficultyLabel(difficulty, locale)}
          </p>
          <h2 className="featured-card__title">{item.title}</h2>
          <p className="featured-card__desc">{item.description}</p>
          <Link to={item.link} className="btn btn-primary">
            {ui.common.readArticle}
          </Link>
          <p className="featured-card__date">{formatArticleDate(item.date, locale)}</p>
        </div>
        <div className="featured-card__visual">
          <img src="/img/featured-shield.png" alt="" loading="lazy" />
        </div>
      </article>
    </section>
  );
}
