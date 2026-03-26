import Link from '@docusaurus/Link';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({className}: SidebarProps) {
  return (
    <aside
      className={[
        'w-[220px] shrink-0 sticky top-[var(--ifm-navbar-height)]',
        'h-[calc(100vh-var(--ifm-navbar-height))] overflow-y-auto',
        'border-r border-border flex flex-col',
        'py-8 px-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}>
      {/* Profile */}
      <div className="mb-6 pb-5 border-b border-border">
        <Link to="/" className="no-underline hover:no-underline">
          <div className="text-[15px] font-bold leading-tight text-[var(--ifm-font-color-base)]">
            Muhammad Okfriansyah
          </div>
          <div className="text-xs text-muted mt-0.5">AI Systems Architect</div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        <NavLink to="/blog">Blog</NavLink>

        <div className="mt-4 flex flex-col gap-0.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted px-2 mb-0.5">
            Knowledge
          </div>
          <NavLink to="/docs/systems/md-ame-autonomous-media-engine">Systems</NavLink>
          <NavLink to="/docs/concepts/deterministic-ai-pipelines">Concepts</NavLink>
          <NavLink to="/docs/projects/md-ame">Projects</NavLink>
        </div>

        <div className="mt-4">
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>

      {/* Social */}
      <div className="mt-auto pt-5 border-t border-border flex flex-col gap-0.5">
        <SocialLink href="https://github.com/okfriansyah-moh">GitHub</SocialLink>
        <SocialLink href="https://www.linkedin.com/in/muhammad-okfriansyah-74092671">
          LinkedIn
        </SocialLink>
      </div>
    </aside>
  );
}

function NavLink({to, children}: {to: string; children: React.ReactNode}) {
  return (
    <Link
      to={to}
      className={[
        'block px-2 py-1.5 text-[13px] font-medium rounded-md',
        'text-[var(--ifm-font-color-base)] no-underline',
        'hover:bg-[var(--color-card-hover)] hover:text-accent hover:no-underline',
        'transition-colors duration-100',
      ].join(' ')}>
      {children}
    </Link>
  );
}

function SocialLink({href, children}: {href: string; children: React.ReactNode}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'block px-2 py-1 text-xs text-muted no-underline rounded-md',
        'hover:text-accent hover:no-underline transition-colors duration-100',
      ].join(' ')}>
      {children}
    </a>
  );
}
