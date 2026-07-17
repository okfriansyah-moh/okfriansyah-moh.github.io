import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarSearch from '@theme/Navbar/Search';
import LocaleToggle from '@site/src/components/ui/LocaleToggle';
import {useLocaleData} from '@site/src/lib/locale-data';

function NavLinks(): ReactNode {
  const {navLinks} = useLocaleData();
  return (
    <nav className="navbar-center-links" aria-label="Main">
      {navLinks.map(({to, label}) => (
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

export default function NavbarContent(): ReactNode {
  return (
    <div className="navbar__inner navbar-pro">
      <div className="navbar__items navbar-pro__left">
        <NavbarBrand />
        <div className="navbar-pro__desktop-only">
          <NavLinks />
        </div>
      </div>
      <div className="navbar__items navbar__items--right navbar-pro__right">
        <NavbarSearch className="navbar-search-pro">
          <SearchBar />
        </NavbarSearch>
        <LocaleToggle />
        <NavbarColorModeToggle className="navbar-color-toggle" />
      </div>
    </div>
  );
}
