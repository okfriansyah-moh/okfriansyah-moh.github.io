import Link from '@docusaurus/Link';

type SocialLinksProps = {
  variant?: 'buttons' | 'inline';
  className?: string;
};

const LINKS = [
  {label: 'GitHub', href: 'https://github.com/okfriansyah-moh'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-okfriansyah-74092671'},
] as const;

export default function SocialLinks({variant = 'buttons', className = ''}: SocialLinksProps) {
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
        {LINKS.map(({label, href}) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted no-underline hover:text-accent transition-colors duration-150">
            {label} ↗
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {LINKS.map(({label, href}) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
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
      className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-white no-underline hover:text-white hover:bg-accent-dark transition-colors duration-200 ${className}`}>
      About me
    </Link>
  );
}
