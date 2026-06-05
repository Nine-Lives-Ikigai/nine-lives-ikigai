// src/utils/layout.ts
import { useEffect, useState } from 'react';

export const useLayoutStyles = () => {
  const [footerHeight, setFooterHeight] = useState(0);
  const [exceedsViewport, setExceedsViewport] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('.footer-container');
    if (!footer) return;

    const footerObserver = new ResizeObserver(([entry]) => {
      setFooterHeight(entry.contentRect.height);
    });

    const pageObserver = new ResizeObserver(() => {
      setExceedsViewport(document.documentElement.scrollHeight > window.innerHeight);
    });

    footerObserver.observe(footer);
    pageObserver.observe(document.documentElement);

    return () => {
      footerObserver.disconnect();
      pageObserver.disconnect();
    };
  }, []);

  return {
    mainContent: {
      height: exceedsViewport ? '100%' : `calc(100vh - ${footerHeight}px)`,
      paddingBottom: `${footerHeight}px`,
    },
  };
};