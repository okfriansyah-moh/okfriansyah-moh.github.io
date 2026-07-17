import {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';

export default function LocaleToggle(): ReactNode {
  const {
    siteConfig,
    i18n: {currentLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const {createUrl} = useAlternatePageUtils();

  function localeHref(locale: string): string {
    const path = createUrl({locale, fullyQualified: false});
    const localeUrl = localeConfigs[locale]?.url ?? siteConfig.url;
    if (localeUrl === siteConfig.url) {
      return `pathname://${path}`;
    }
    return createUrl({locale, fullyQualified: true});
  }

  return (
    <div className="locale-toggle" role="group" aria-label="Language">
      {locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            to={localeHref(locale)}
            autoAddBaseUrl={false}
            className={`locale-toggle__btn${active ? ' locale-toggle__btn--active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={(e) => active && e.preventDefault()}>
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
