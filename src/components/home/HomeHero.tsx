import Link from '@docusaurus/Link';

type HomeHeroProps = {
  onBrowseArticles?: () => void;
};

export default function HomeHero({onBrowseArticles}: HomeHeroProps) {
  return (
    <section className="home-hero page-shell">
      <div className="home-hero__grid">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">ENGINEERING · BUILDING · SHARING</p>
          <h1 className="home-hero__title">
            I build production software, open source projects, and explain how they work.
          </h1>
          <p className="home-hero__lead">
            Engineering Manager &amp; Backend Engineer — I write about systems architecture,
            deterministic AI pipelines, and lessons from shipping at scale.
          </p>
          <div className="home-hero__actions">
            <a
              href="#articles"
              className="btn btn-primary"
              onClick={onBrowseArticles}>
              Browse Articles
            </a>
            <Link to="/projects" className="btn btn-secondary">
              Explore Projects
              <span aria-hidden="true"> →</span>
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
