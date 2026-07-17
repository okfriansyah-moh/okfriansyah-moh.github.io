import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {NAVBAR_ITEMS} from './src/data/nav-links';

const config: Config = {
  url: 'https://okfriansyah-moh.github.io',
  baseUrl: '/',
  title: 'Muhammad Okfriansyah',
  tagline: 'AI Systems Architect — Autonomous Systems, Deterministic Pipelines, Distributed Architecture',
  favicon: 'img/favicon.svg',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/favicon.svg?v=opi-xl',
        type: 'image/svg+xml',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/favicon-48.png?v=opi-xl',
        sizes: '48x48',
        type: 'image/png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/favicon-32.png?v=opi-xl',
        sizes: '32x32',
        type: 'image/png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/favicon-16.png?v=opi-xl',
        sizes: '16x16',
        type: 'image/png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: '/img/favicon.ico?v=opi-xl',
        type: 'image/x-icon',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/icon-192.png?v=opi-xl',
      },
    },
    {tagName: 'meta', attributes: {name: 'theme-color', content: '#1E3A8A'}},
  ],

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
          breadcrumbs: true,
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
      title: 'okfriansyah',
      hideOnScroll: false,
      items: NAVBAR_ITEMS,
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
      theme: {light: 'neutral', dark: 'base'},
      options: {
        fontFamily: "'Inter', system-ui, sans-serif",
        themeVariables: {
          primaryColor: '#EFF6FF',
          primaryTextColor: '#111827',
          primaryBorderColor: '#3B82F6',
          lineColor: '#6B7280',
          secondaryColor: '#F5F3FF',
          tertiaryColor: '#F9FAFB',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
