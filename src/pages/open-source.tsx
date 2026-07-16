import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import OpenSourceGrid from '@site/src/components/home/OpenSourceGrid';

export default function OpenSourcePage(): ReactNode {
  return (
    <Layout
      title="Open Source"
      description="Public repositories and tools from Muhammad Okfriansyah."
      wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <header className="hub-page__header">
          <p className="hub-page__eyebrow">OPEN SOURCE</p>
          <h1 className="hub-page__title">Repositories &amp; tools</h1>
          <p className="hub-page__lead">
            Production-oriented projects shared publicly — pipelines, agents, and developer tooling.
          </p>
        </header>
      </div>
      <OpenSourceGrid />
    </Layout>
  );
}
