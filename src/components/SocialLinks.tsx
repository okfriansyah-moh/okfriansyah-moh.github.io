import Link from '@docusaurus/Link';
import {CONTACT_LINKS} from '@site/src/data/contact-links';

type SocialLinksProps = {
  variant?: 'buttons' | 'inline';
  className?: string;
};

function linkSuffix(external: boolean): string {
  return external ? ' ↗' : '';
}

export default function SocialLinks({variant = 'buttons', className = ''}: SocialLinksProps) {
  if (variant === 'inline') {
    return (
      <nav className={`site-footer__links ${className}`} aria-label="Contact and profiles">
        {CONTACT_LINKS.map(({label, href, external}) => (
          <a
            key={label}
            href={href}
            {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
            className="site-footer__link">
            {label}
            {linkSuffix(external)}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {CONTACT_LINKS.map(({label, href, external}) => (
        <a
          key={label}
          href={href}
          {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
          className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-md text-sm font-medium border border-border text-[var(--ifm-font-color-base)] no-underline hover:border-accent hover:text-accent transition-colors duration-200">
          {label}
        </a>
      ))}
    </div>
  );
}

export function AboutButton({className = ''}: {className?: string}) {
  return (
    <Link
      to="/about"
      className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md text-sm font-medium border border-border text-[var(--ifm-font-color-base)] no-underline hover:border-accent hover:text-accent transition-colors duration-200 ${className}`}>
      About
    </Link>
  );
}
