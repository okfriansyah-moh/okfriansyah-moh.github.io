import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import ArticleHeader from '@site/src/components/doc/ArticleHeader';
import DocEngagement from '@site/src/components/doc/DocEngagement';
import ArticleSidebar from '@site/src/components/doc/ArticleSidebar';
import type {Props} from '@theme/DocItem/Layout';

export default function DocItemLayout({children}: Props): ReactNode {
  const {metadata, frontMatter, toc} = useDoc();
  const hideToc = frontMatter.hide_table_of_contents || toc.length === 0;

  return (
    <div className="doc-layout page-shell">
      <ContentVisibility metadata={metadata} />
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />
      <ArticleHeader />

      <div className="doc-layout__grid">
        <div className="doc-layout__left">
          {!hideToc && <DocItemTOCDesktop />}
          <DocEngagement />
        </div>

        <article className="doc-layout__main">
          <DocItemTOCMobile />
          <DocItemContent>{children}</DocItemContent>
          <DocItemFooter />
          <DocItemPaginator />
        </article>

        <aside className="doc-layout__right">
          <ArticleSidebar />
        </aside>
      </div>
    </div>
  );
}
