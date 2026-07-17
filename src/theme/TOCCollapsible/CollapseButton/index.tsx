import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/TOCCollapsible/CollapseButton';
import {useLocaleData} from '@site/src/lib/locale-data';

import styles from './styles.module.css';

export default function TOCCollapsibleCollapseButton({
  collapsed,
  ...props
}: Props): ReactNode {
  const {ui} = useLocaleData();

  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'clean-btn',
        styles.tocCollapsibleButton,
        !collapsed && styles.tocCollapsibleButtonExpanded,
        'toc-mobile-trigger',
        props.className,
      )}
      aria-label={collapsed ? ui.common.openToc : ui.common.closeToc}>
      <span className="toc-mobile-trigger__leading" aria-hidden="true">
        ≡
      </span>
      <span className="toc-mobile-trigger__label">{ui.common.tableOfContents}</span>
      <span className="toc-mobile-trigger__chevron" aria-hidden="true">
        {collapsed ? '▼' : '▲'}
      </span>
    </button>
  );
}
