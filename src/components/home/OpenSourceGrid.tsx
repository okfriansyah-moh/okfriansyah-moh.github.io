import SectionHeading from '@site/src/components/ui/SectionHeading';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function OpenSourceGrid() {
  const {openSource, ui} = useLocaleData();

  return (
    <section className="page-shell home-section" id="open-source">
      <SectionHeading title={ui.sections.openSource} viewAllHref="https://github.com/okfriansyah-moh" />
      <div className="grid-2">
        {openSource.map((repo) => (
          <a
            key={repo.name}
            href={repo.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="card-pro oss-card">
            <div className="oss-card__head">
              <h3 className="oss-card__name">{repo.name}</h3>
              <span className="oss-card__stars">★ {repo.stars}</span>
            </div>
            <p className="oss-card__desc">{repo.description}</p>
            <span className="tag-pill">{repo.language}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
