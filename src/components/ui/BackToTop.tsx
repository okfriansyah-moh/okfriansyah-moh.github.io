import {type ReactNode, useEffect, useState} from 'react';
import {useLocaleData} from '@site/src/lib/locale-data';

export default function BackToTop(): ReactNode {
  const {ui} = useLocaleData();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      aria-label={ui.common.backToTop}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      <span aria-hidden="true">↑</span>
    </button>
  );
}
