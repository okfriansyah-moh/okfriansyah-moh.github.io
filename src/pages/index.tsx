import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import CaseStudiesRow from '@site/src/components/home/CaseStudiesRow';
import CurrentlyBuilding from '@site/src/components/home/CurrentlyBuilding';
import FeaturedArticleCard from '@site/src/components/home/FeaturedArticleCard';
import HomeHero from '@site/src/components/home/HomeHero';
import LearningPaths from '@site/src/components/home/LearningPaths';
import OpenSourceGrid from '@site/src/components/home/OpenSourceGrid';
import RecentArticlesGrid from '@site/src/components/home/RecentArticlesGrid';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function Home(): ReactNode {
  const {contentFeed, ui} = useLocaleData();
  const featured = contentFeed[0];

  return (
    <Layout
      title={ui.pages.home.title}
      description={ui.pages.home.description}
      wrapperClassName="homepage">
      <HomeHero />
      <CurrentlyBuilding />
      {featured && <FeaturedArticleCard item={featured} />}
      <RecentArticlesGrid items={contentFeed} excludeLink={featured?.link} />
      <LearningPaths />
      <CaseStudiesRow items={contentFeed} />
      <OpenSourceGrid />
    </Layout>
  );
}
