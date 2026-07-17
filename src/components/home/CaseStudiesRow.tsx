import Link from '@docusaurus/Link';
import SectionHeading from '@site/src/components/ui/SectionHeading';
import type {ContentItem} from '@site/src/data/content-feed';
import {TYPE_LABELS} from '@site/src/data/content-feed';
import {formatArticleDate, thumbForItem} from '@site/src/lib/content';

type CaseStudiesRowProps = {
  items: ContentItem[];
};

export default function CaseStudiesRow({items}: CaseStudiesRowProps) {
  const cases = items.filter((i) => i.type === 'system').slice(0, 3);

  return (
    <section className="page-shell home-section" id="case-studies">
      <SectionHeading title="Case Studies" viewAllHref="/case-studies" />
      <div className="grid-3">
        {cases.map((item) => (
          <Link key={item.link} to={item.link} className="card-pro case-card">
            <div className="case-card__thumb">
              <img src={thumbForItem(item)} alt="" loading="lazy" />
            </div>
            <span className="badge badge-type">{TYPE_LABELS[item.type]}</span>
            <h3 className="case-card__title">{item.title}</h3>
            <p className="case-card__desc">{item.description}</p>
            <span className="case-card__date">{formatArticleDate(item.date)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
