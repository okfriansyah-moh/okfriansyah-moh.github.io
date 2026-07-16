import {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import CaseStudiesRow from '@site/src/components/home/CaseStudiesRow';
import CurrentlyBuilding from '@site/src/components/home/CurrentlyBuilding';
import FeaturedArticleCard from '@site/src/components/home/FeaturedArticleCard';
import HomeHero from '@site/src/components/home/HomeHero';
import LearningPaths from '@site/src/components/home/LearningPaths';
import OpenSourceGrid from '@site/src/components/home/OpenSourceGrid';
import RecentArticlesGrid from '@site/src/components/home/RecentArticlesGrid';
import {CONTENT_FEED} from '@site/src/data/content-feed';

export default function Home(): ReactNode {
  const featured = CONTENT_FEED[0];

  return (
    <Layout
      title="Muhammad Okfriansyah — Engineering Portfolio"
      description="Production software, open source projects, and architecture breakdowns from real engineering work."
      wrapperClassName="homepage">
      <HomeHero />
      <CurrentlyBuilding />
      <FeaturedArticleCard item={featured} />
      <RecentArticlesGrid items={CONTENT_FEED} excludeLink={featured.link} />
      <LearningPaths />
      <CaseStudiesRow items={CONTENT_FEED} />
      <OpenSourceGrid />
    </Layout>
  );
}
