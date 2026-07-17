import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {ErrorCauseBoundary} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import {NAV_LINKS} from '@site/src/data/nav-links';

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

function NavbarBrand(): ReactNode {
  return (
    <Link to="/" className="navbar-brand-pro" aria-label="Home">
      <span className="navbar-logo-box">opi</span>
      <span className="navbar-brand-name">okfriansyah</span>
    </Link>
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
      </div>
      <div className="navbar__items navbar__items--right navbar-pro__right">
        <div className="navbar-pro__mobile-only">
          <ProfileAvatar />
        </div>
        <NavbarSearch className="navbar-search-pro">
          <SearchBar />
        </NavbarSearch>
        <NavbarColorModeToggle className="navbar-color-toggle" />
        <div className="navbar-pro__desktop-only">
          <ProfileAvatar />
        </div>
      </div>
    </div>
  );
}
