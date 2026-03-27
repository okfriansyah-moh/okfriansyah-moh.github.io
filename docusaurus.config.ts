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
      items: [],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Knowledge',
          items: [
            {label: 'Systems', to: '/docs/systems/md-ame-autonomous-media-engine'},
            {label: 'Concepts', to: '/docs/concepts/deterministic-ai-pipelines'},
            {label: 'Projects', to: '/docs/projects/md-ame'},
          ],
        },
        {
          title: 'Content',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'About', to: '/about'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'GitHub', href: 'https://github.com/okfriansyah-moh'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-okfriansyah-74092671'},
            {label: 'Instagram', href: 'https://instagram.com/okfriansyah'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Muhammad Okfriansyah. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
