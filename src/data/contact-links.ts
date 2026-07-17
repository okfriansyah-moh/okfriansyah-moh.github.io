export type ContactLink = {
  label: string;
  href: string;
  external: boolean;
};

export const CONTACT_LINKS: ContactLink[] = [
  {label: 'GitHub', href: 'https://github.com/okfriansyah-moh', external: true},
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-okfriansyah-74092671',
    external: true,
  },
  {label: 'Cursor', href: 'https://cursor.com/@okfriansyah-moh', external: true},
  {
    label: 'Udemy',
    href: 'https://www.udemy.com/user/muhammad-okfriansyah/',
    external: true,
  },
  {label: 'Email', href: 'mailto:okfriansyah@gmail.com', external: false},
];
