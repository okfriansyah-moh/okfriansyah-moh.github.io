import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  url: 'https://okfriansyah-moh.github.io',
  baseUrl: '/',
  title: 'Muhammad Okfriansyah',
  tagline: 'AI Systems Architect — Autonomous Systems, Deterministic Pipelines, Distributed Architecture',
  favicon: 'img/favicon.ico',

  organizationName: 'okfriansyah-moh',
  projectName: 'okfriansyah-moh.github.io',

  future: {
    v4: true,
  },

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './plugins/tailwind-plugin.cjs',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          breadcrumbs: false,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Muhammad Okfriansyah',
      hideOnScroll: false,
      items: [
        {
          to: '/',
          label: 'Writing',
          position: 'right',
          activeBaseRegex: '^/$',
        },
        {to: '/about', label: 'About', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `© ${new Date().getFullYear()} Muhammad Okfriansyah`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
