import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SocialLinks from '@site/src/components/SocialLinks';

export default function Footer(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{siteConfig.title}</p>
          <p className="site-footer__tagline">
            Engineering portfolio — production software, open source, and architecture writing.
          </p>
        </div>
        <SocialLinks variant="inline" />
        <Link to="/about" className="site-footer__link site-footer__about">
          About
        </Link>
      </div>
      <p className="site-footer__copyright">
        © {year} Muhammad Okfriansyah. Built with Docusaurus.
      </p>
    </footer>
  );
}
