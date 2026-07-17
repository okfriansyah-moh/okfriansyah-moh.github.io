import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ArticleLayoutShell from '@site/src/components/doc/ArticleLayoutShell';
import type {Props} from '@theme/DocItem/Layout';

/** Docusaurus swizzle entry — delegates to the shared article framework shell. */
export default function DocItemLayout({children}: Props): ReactNode {
  const {metadata, frontMatter, toc} = useDoc();
  const hideToc = frontMatter.hide_table_of_contents || toc.length === 0;

  return (
    <ArticleLayoutShell metadata={metadata} hideToc={hideToc}>
      {children}
    </ArticleLayoutShell>
  );
}
