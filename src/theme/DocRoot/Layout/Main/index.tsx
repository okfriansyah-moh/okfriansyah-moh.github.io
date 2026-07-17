import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/DocRoot/Layout/Main';
import styles from './styles.module.css';

/** Full-width docs main shell — used by every article under /docs/** */
export default function DocRootLayoutMain({children}: Props): ReactNode {
  return (
    <main className={clsx(styles.docMainContainer, 'article-framework-main')}>
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          'article-framework-shell',
        )}>
        {children}
      </div>
    </main>
  );
}
