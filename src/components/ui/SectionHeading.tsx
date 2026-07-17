import Link from '@docusaurus/Link';
import {useLocaleData} from '@site/src/lib/locale-data';

type SectionHeadingProps = {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export default function SectionHeading({
  title,
  viewAllHref,
  viewAllLabel,
}: SectionHeadingProps) {
  const {ui} = useLocaleData();
  const label = viewAllLabel ?? ui.common.viewAll;

  return (
    <div className="section-heading">
      <h2 className="section-heading__title">{title}</h2>
      {viewAllHref && (
        <Link to={viewAllHref} className="section-heading__link">
          {label} →
        </Link>
      )}
    </div>
  );
}
