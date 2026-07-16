import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
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

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarBrand(): ReactNode {
  return (
    <Link to="/" className="navbar-brand-custom" aria-label="Home — Muhammad Okfriansyah">
      <span className="navbar-avatar" aria-hidden="true">
        MO
      </span>
      <span className="navbar-brand-text">
        <span className="navbar-wordmark">Muhammad Okfriansyah</span>
        <span className="navbar-role-tag">AI Systems Architect</span>
      </span>
    </Link>
  );
}

function GitHubIconLink(): ReactNode {
  return (
    <a
      href="https://github.com/okfriansyah-moh"
      target="_blank"
      rel="noopener noreferrer"
      className="navbar-icon-btn"
      aria-label="GitHub profile">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    </a>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <div className="navbar__inner">
      <div className="navbar__items">
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        <NavbarBrand />
        <NavbarItems items={leftItems} />
        {!searchBarItem && (
          <NavbarSearch className="navbar-search-slot">
            <SearchBar />
          </NavbarSearch>
        )}
      </div>
      <div className="navbar__items navbar__items--right">
        <NavbarItems items={rightItems} />
        <GitHubIconLink />
        <NavbarColorModeToggle className="navbar-color-toggle" />
      </div>
    </div>
  );
}
