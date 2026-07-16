import Link from '@docusaurus/Link';

type SectionHeadingProps = {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export default function SectionHeading({
  title,
  viewAllHref,
  viewAllLabel = 'View all',
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 className="section-heading__title">{title}</h2>
      {viewAllHref && (
        <Link to={viewAllHref} className="section-heading__link">
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
