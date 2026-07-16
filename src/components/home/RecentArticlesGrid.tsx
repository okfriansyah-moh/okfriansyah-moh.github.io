import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import type {ContentItem} from '@site/src/data/content-feed';
import {difficultyForItem, thumbForType} from '@site/src/lib/content';

type RecentArticlesGridProps = {
  items: ContentItem[];
  excludeLink?: string;
};

function ArticleCard({item}: {item: ContentItem}) {
  const difficulty = difficultyForItem(item);

  return (
    <article className="card-pro article-card">
      <Link to={item.link} className="article-card__link">
        <div className="article-card__thumb">
          <img src={thumbForType(item.type)} alt="" loading="lazy" />
        </div>
        <span className={`badge badge-difficulty badge-difficulty--${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
        <h3 className="article-card__title">{item.title}</h3>
        <p className="article-card__meta">{item.readingTime ?? 5} min read</p>
      </Link>
    </article>
  );
}

export default function RecentArticlesGrid({items, excludeLink}: RecentArticlesGridProps) {
  const visible = items.filter((i) => i.link !== excludeLink).slice(0, 4);

  return (
    <section className="page-shell home-section" id="articles">
      <SectionHeading title="Recent Articles" viewAllHref="/articles" />
      <div className="grid-4">
        {visible.map((item) => (
          <ArticleCard key={item.link} item={item} />
        ))}
      </div>
    </section>
  );
}
