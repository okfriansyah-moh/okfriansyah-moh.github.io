import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/TOCCollapsible/CollapseButton';

import styles from './styles.module.css';

export default function TOCCollapsibleCollapseButton({
  collapsed,
  ...props
}: Props): ReactNode {
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
      aria-label={collapsed ? 'Open table of contents' : 'Close table of contents'}>
      <span className="toc-mobile-trigger__leading" aria-hidden="true">
        ≡
      </span>
      <span className="toc-mobile-trigger__label">Table of contents</span>
      <span className="toc-mobile-trigger__chevron" aria-hidden="true">
        {collapsed ? '▼' : '▲'}
      </span>
    </button>
  );
}
