import React, {type ReactNode} from 'react';
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
            Engineering journal — architecture, reliability, and lessons from production AI systems.
          </p>
        </div>
        <div className="site-footer__connect">
          <p className="site-footer__label">Connect</p>
          <SocialLinks variant="inline" />
        </div>
      </div>
      <p className="site-footer__copyright">
        © {year} Muhammad Okfriansyah. Built with Docusaurus.
      </p>
    </footer>
  );
}
