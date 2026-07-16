import React, {type ReactNode, useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import Root from '@theme-original/Root';

const WRITING_SCROLL_KEY = 'scroll-to-writing';

type Props = {children: ReactNode};

function scrollToWriting(smooth: boolean): void {
  const target = document.getElementById('writing');
  if (!target) return;
  target.scrollIntoView({
    behavior: smooth ? 'smooth' : 'auto',
    block: 'start',
  });
}

export default function RootWrapper(props: Props): ReactNode {
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.toggle('navbar-scrolled', window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

    if (location.pathname === '/' && sessionStorage.getItem(WRITING_SCROLL_KEY) === '1') {
      sessionStorage.removeItem(WRITING_SCROLL_KEY);
      const timer = window.setTimeout(() => scrollToWriting(!prefersReduced), 120);
      return () => window.clearTimeout(timer);
    }

    if (location.pathname === '/' && location.hash === '#writing') {
      const timer = window.setTimeout(() => scrollToWriting(!prefersReduced), 80);
      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Root {...props} />
    </>
  );
}
