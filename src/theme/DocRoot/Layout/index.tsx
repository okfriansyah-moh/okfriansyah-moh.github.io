import React, {type ReactNode} from 'react';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type {Props} from '@theme/DocRoot/Layout';
import styles from './styles.module.css';

/**
 * Docs root layout for all /docs/* articles.
 * Default Docusaurus sidebar is omitted — we use the custom 3-column article framework.
 */
export default function DocRootLayout({children}: Props): ReactNode {
  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        <DocRootLayoutMain hiddenSidebarContainer>{children}</DocRootLayoutMain>
      </div>
    </div>
  );
}
