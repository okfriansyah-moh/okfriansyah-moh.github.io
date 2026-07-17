import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import OpenSourceGrid from '@site/src/components/home/OpenSourceGrid';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function OpenSourcePage(): ReactNode {
  const {ui} = useLocaleData();

  return (
    <Layout
      title={ui.pages.openSource.title}
      description={ui.pages.openSource.description}
      wrapperClassName="hub-page">
      <div className="page-shell hub-page__inner">
        <header className="hub-page__header">
          <p className="hub-page__eyebrow">{ui.pages.openSourceHub.eyebrow}</p>
          <h1 className="hub-page__title">{ui.pages.openSourceHub.title}</h1>
          <p className="hub-page__lead">{ui.pages.openSourceHub.lead}</p>
        </header>
      </div>
      <OpenSourceGrid />
    </Layout>
  );
}
