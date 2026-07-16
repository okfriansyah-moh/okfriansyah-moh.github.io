/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: { preflight: false },
  content: ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{md,mdx}', './blog/**/*.{md,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--ifm-color-primary)',
        'accent-dark': 'var(--color-accent-dark)',
        border: 'var(--color-border)',
        muted: 'var(--color-text-muted)',
        surface: 'var(--color-surface)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: 'var(--layout-shell-max)',
        editorial: 'var(--layout-editorial-max)',
        content: 'var(--layout-content-max)',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [],
};
