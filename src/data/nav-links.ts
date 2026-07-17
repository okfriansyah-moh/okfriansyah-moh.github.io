export const NAV_LINKS = [
  {to: '/articles', label: 'Articles'},
  {to: '/projects', label: 'Projects'},
  {to: '/case-studies', label: 'Case Studies'},
  {to: '/learning-paths', label: 'Learning Paths'},
  {to: '/open-source', label: 'Open Source'},
  {to: '/about', label: 'About'},
] as const;

/** Docusaurus navbar config — powers the mobile sidebar drawer. */
export const NAVBAR_ITEMS = NAV_LINKS.map(({to, label}) => ({
  to,
  label,
  position: 'left' as const,
}));
