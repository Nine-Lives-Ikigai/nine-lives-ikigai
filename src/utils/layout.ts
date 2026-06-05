// src/utils/layout.ts
import { useEffect, useState } from 'react';

export const useLayoutStyles = () => {
  const [footerHeight, setFooterHeight] = useState(0);
  const [exceedsViewport, setExceedsViewport] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('.footer-container');
    const main = document.querySelector('.main-content');
    if (!footer || !main) return;

    const footerObserver = new ResizeObserver(([entry]) => {
      setFooterHeight(entry.contentRect.height);
    });

    const mainObserver = new ResizeObserver(([entry]) => {
      setExceedsViewport(entry.contentRect.height > window.innerHeight);
    });

    footerObserver.observe(footer);
    mainObserver.observe(main);

    return () => {
      footerObserver.disconnect();
      mainObserver.disconnect();
    };
  }, []);

  return {
    height: exceedsViewport ? '100%' : `calc(100vh - ${footerHeight}px)`,
    paddingBottom: `${footerHeight}px`,
  };
};