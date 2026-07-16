import Link from '@docusaurus/Link';
import type {ContentItem} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {difficultyForItem, formatArticleDate} from '@site/src/lib/content';

type FeaturedArticleCardProps = {
  item: ContentItem;
};

export default function FeaturedArticleCard({item}: FeaturedArticleCardProps) {
  const difficulty = difficultyForItem(item);

  return (
    <section className="page-shell home-section" id="featured">
      <article className="card-pro featured-card">
        <div className="featured-card__body">
          <span className="badge badge-featured">FEATURED</span>
          <p className="featured-card__meta">
            {TYPE_LABELS[item.type]} · {item.readingTime ?? 5} min read · {difficulty}
          </p>
          <h2 className="featured-card__title">
            <Link to={item.link}>{item.title}</Link>
          </h2>
          <p className="featured-card__desc">{item.description}</p>
          <Link to={item.link} className="btn btn-primary">
            Read Article
          </Link>
          <p className="featured-card__date">{formatArticleDate(item.date)}</p>
        </div>
        <div className="featured-card__visual">
          <img src="/img/featured-shield.png" alt="" loading="lazy" />
        </div>
      </article>
    </section>
  );
}
