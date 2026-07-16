import React, {type ReactNode, useEffect, useState} from 'react';
import clsx from 'clsx';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';

const STORAGE_KEY = 'doc-toc-collapsed';

export default function DocItemTOCDesktop(): ReactNode {
  const {toc, frontMatter} = useDoc();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCollapsed(window.localStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      return next;
    });
  };

  if (!toc.length || frontMatter.hide_table_of_contents) return null;

  return (
    <aside className={clsx('doc-left-rail', collapsed && 'doc-left-rail--collapsed')}>
      <div className="doc-left-rail__toc card-pro">
        <button
          type="button"
          className="doc-left-rail__toggle"
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-controls="doc-toc-panel">
          <span className="doc-left-rail__toggle-label">On this page</span>
          <span className="doc-left-rail__chevron" aria-hidden="true">
            {collapsed ? '›' : '‹'}
          </span>
        </button>
        {!collapsed && (
          <div id="doc-toc-panel">
            <TOC
              toc={toc}
              minHeadingLevel={frontMatter.toc_min_heading_level}
              maxHeadingLevel={frontMatter.toc_max_heading_level}
              className="doc-toc-custom"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
