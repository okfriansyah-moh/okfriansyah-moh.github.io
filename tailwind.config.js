/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Disable Tailwind reset — Docusaurus has its own
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './docs/**/*.{md,mdx}',
    './blog/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--ifm-color-primary)',
        border: 'var(--color-border)',
        muted: 'var(--color-text-muted)',
        surface: 'var(--color-surface)',
      },
      maxWidth: {
        content: '720px',
        grid: '1100px',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};
