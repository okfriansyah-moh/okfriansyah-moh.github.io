import {useDoc} from '@docusaurus/plugin-content-docs/client';

type DocFrontMatterExtra = { repo?: string };

export default function DocEngagement() {
  const {frontMatter} = useDoc();
  const fm = frontMatter as DocFrontMatterExtra;
  const repo = fm.repo ?? 'https://github.com/okfriansyah-moh';

  const share = (network: 'twitter' | 'linkedin' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (network === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    } else if (network === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      void navigator.clipboard?.writeText(url);
    }
  };

  return (
    <div className="card-pro doc-engagement">
      <p className="doc-engagement__label">Like this article?</p>
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-block">
        ★ Star on GitHub
      </a>
      <p className="doc-engagement__share-label">Share</p>
      <div className="doc-engagement__share">
        <button type="button" className="share-btn" onClick={() => share('twitter')} aria-label="Share on X">
          X
        </button>
        <button type="button" className="share-btn" onClick={() => share('linkedin')} aria-label="Share on LinkedIn">
          in
        </button>
        <button type="button" className="share-btn" onClick={() => share('copy')} aria-label="Copy link">
          ⧉
        </button>
      </div>
    </div>
  );
}
