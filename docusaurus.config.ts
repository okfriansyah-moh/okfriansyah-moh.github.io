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

  markdown: {
    mermaid: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './plugins/tailwind-plugin.cjs',
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutHint: false,
      },
    ],
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
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      options: {
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        themeVariables: {
          primaryColor: '#f0ebe4',
          primaryTextColor: '#1c1917',
          primaryBorderColor: '#c42b2b',
          lineColor: '#78716c',
          secondaryColor: '#fdf5f4',
          tertiaryColor: '#f8f6f3',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
