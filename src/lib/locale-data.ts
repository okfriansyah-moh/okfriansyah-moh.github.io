import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {ContentItem, ContentType} from '@site/src/data/content-feed';

import enNavLinks from '@site/src/data/i18n/en/nav-links.json';
import idNavLinks from '@site/src/data/i18n/id/nav-links.json';
import enUi from '@site/src/data/i18n/en/ui.json';
import idUi from '@site/src/data/i18n/id/ui.json';
import enAbout from '@site/src/data/i18n/en/about.json';
import idAbout from '@site/src/data/i18n/id/about.json';
import enLearningPaths from '@site/src/data/i18n/en/learning-paths.json';
import idLearningPaths from '@site/src/data/i18n/id/learning-paths.json';
import enProjectsBuilding from '@site/src/data/i18n/en/projects-building.json';
import idProjectsBuilding from '@site/src/data/i18n/id/projects-building.json';
import enOpenSource from '@site/src/data/i18n/en/open-source.json';
import idOpenSource from '@site/src/data/i18n/id/open-source.json';
import enFeedMeta from '@site/src/data/i18n/en/content-feed.meta.json';
import idFeedMeta from '@site/src/data/i18n/id/content-feed.meta.json';

export type SiteLocale = 'en' | 'id';

export type NavLink = {to: string; label: string};

export type LearningPath = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  links: string[];
};

export type BuildingProject = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  status: string;
};

export type OpenSourceRepo = {
  name: string;
  description: string;
  repo: string;
  stars: number;
  language: string;
};

export type AboutMetric = {
  valueKey?: string;
  value?: string;
  labelKey: string;
};

export type AboutExperience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type AboutData = {
  bio: string;
  bioContactLead: string;
  bioContactOr: string;
  experienceTitle: string;
  metrics: AboutMetric[];
  experience: AboutExperience[];
  skills: Array<{group: string; items: string[]}>;
  education: Array<{school: string; program: string; period: string}>;
  principles: Array<{title: string; body: string}>;
};

export type UiData = typeof enUi;

export type LocaleData = {
  locale: SiteLocale;
  navLinks: NavLink[];
  ui: UiData;
  about: AboutData;
  learningPaths: LearningPath[];
  projectsBuilding: BuildingProject[];
  openSource: OpenSourceRepo[];
  contentFeed: ContentItem[];
  typeLabels: Record<ContentType, string>;
  typeFilters: Array<{id: ContentType | 'all'; label: string}>;
};

const PACKS: Record<SiteLocale, Omit<LocaleData, 'locale' | 'contentFeed' | 'typeLabels' | 'typeFilters'>> = {
  en: {
    navLinks: enNavLinks,
    ui: enUi,
    about: enAbout,
    learningPaths: enLearningPaths,
    projectsBuilding: enProjectsBuilding,
    openSource: enOpenSource,
  },
  id: {
    navLinks: idNavLinks,
    ui: idUi,
    about: idAbout,
    learningPaths: idLearningPaths,
    projectsBuilding: idProjectsBuilding,
    openSource: idOpenSource,
  },
};

const FEED_META: Record<SiteLocale, {items: ContentItem[]}> = {
  en: enFeedMeta as {items: ContentItem[]},
  id: idFeedMeta as {items: ContentItem[]},
};

function isSiteLocale(value: string): value is SiteLocale {
  return value === 'en' || value === 'id';
}

export function getLocaleData(locale: string): LocaleData {
  const key = isSiteLocale(locale) ? locale : 'en';
  const pack = PACKS[key];
  const feed = FEED_META[key].items;
  return {
    locale: key,
    ...pack,
    contentFeed: feed,
    typeLabels: pack.ui.typeLabels as Record<ContentType, string>,
    typeFilters: pack.ui.typeFilters as Array<{id: ContentType | 'all'; label: string}>,
  };
}

export function useLocaleData(): LocaleData {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  return getLocaleData(currentLocale);
}

export function useContentFeed(): ContentItem[] {
  return useLocaleData().contentFeed;
}

export function useTypeLabels(): Record<ContentType, string> {
  return useLocaleData().typeLabels;
}
