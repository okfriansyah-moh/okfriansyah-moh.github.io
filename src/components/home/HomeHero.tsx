import Link from '@docusaurus/Link';
import {useLocaleData} from '@site/src/lib/locale-data';

type HomeHeroProps = {
  onBrowseArticles?: () => void;
};

export default function HomeHero({onBrowseArticles}: HomeHeroProps) {
  const {ui} = useLocaleData();

  return (
    <section className="home-hero page-shell">
      <div className="home-hero__grid">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">{ui.hero.eyebrow}</p>
          <h1 className="home-hero__title">{ui.hero.title}</h1>
          <p className="home-hero__lead">{ui.hero.lead}</p>
          <div className="home-hero__actions">
            <a
              href="#articles"
              className="btn btn-primary"
              onClick={onBrowseArticles}>
              {ui.hero.browseArticles}
            </a>
            <Link to="/projects" className="btn btn-secondary">
              {ui.hero.exploreProjects}
              <span aria-hidden="true"> →</span>
            </Link>
            <Link to="/about" className="btn btn-secondary home-hero__about">
              {ui.hero.aboutMe}
            </Link>
          </div>
        </div>
        <div className="home-hero__visual" aria-hidden="true">
          <img
            src="/img/hero-infrastructure.png"
            alt=""
            className="home-hero__image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
