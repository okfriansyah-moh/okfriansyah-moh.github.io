import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useThemeConfig, ErrorCauseBoundary} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';

const NAV_LINKS = [
  {to: '/articles', label: 'Articles'},
  {to: '/projects', label: 'Projects'},
  {to: '/case-studies', label: 'Case Studies'},
  {to: '/learning-paths', label: 'Learning Paths'},
  {to: '/open-source', label: 'Open Source'},
  {to: '/about', label: 'About'},
] as const;

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary key={i} onError={() => new Error('Navbar item failed')}>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarBrand(): ReactNode {
  return (
    <Link to="/" className="navbar-brand-pro" aria-label="Home">
      <span className="navbar-logo-box">ok</span>
      <span className="navbar-brand-name">okfriansyah</span>
    </Link>
  );
}

function NavLinks(): ReactNode {
  return (
    <nav className="navbar-center-links" aria-label="Main">
      {NAV_LINKS.map(({to, label}) => (
        <Link key={to} to={to} className="navbar-center-link">
          {label}
        </Link>
      ))}
    </nav>
  );
}

function ProfileAvatar(): ReactNode {
  return (
    <Link to="/about" className="navbar-profile-avatar" aria-label="About profile">
      MO
    </Link>
  );
}

export default function NavbarContent(): ReactNode {
  const location = useLocation();
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const isDocArticle = location.pathname.startsWith('/docs/');
  const showMobileMenu = !mobileSidebar.disabled && !isDocArticle;

  return (
    <div className="navbar__inner navbar-pro">
      <div className="navbar__items navbar-pro__left">
        {showMobileMenu && <NavbarMobileSidebarToggle />}
        <NavbarBrand />
        <div className="navbar-pro__desktop-only">
          <NavLinks />
        </div>
        <NavbarItems items={leftItems} />
      </div>
      <div className="navbar__items navbar__items--right navbar-pro__right">
        <NavbarColorModeToggle className="navbar-color-toggle" />
        <NavbarSearch className="navbar-search-pro">
          <SearchBar />
        </NavbarSearch>
        <NavbarItems items={rightItems} />
        <div className="navbar-pro__desktop-only">
          <ProfileAvatar />
        </div>
      </div>
    </div>
  );
}
