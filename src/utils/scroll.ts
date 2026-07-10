// src/utils/scroll.ts - Enhanced scroll utilities
import { useEffect, useState } from 'react';

export const HEADER_OFFSET = 77;

export const smoothScrollTo = (targetId: string, offset: number = HEADER_OFFSET): void => {
  let element: HTMLElement | null = null;
  try {
    element = document.querySelector<HTMLElement>(targetId);
  } catch {
    return;
  }

  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Hook for scroll-based visibility
export const useScrollVisibility = (threshold: number = 100): boolean => {
  const [isVisible, setIsVisible] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};

// Slim header is the same "past a scroll threshold" check under a more
// descriptive name for this call site — not a separate implementation.
export const useSlimHeader = useScrollVisibility;

// Hook for handling hash navigation on page load
export const useHashNavigation = (offset: number = HEADER_OFFSET): void => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Small delay to ensure page is loaded
    const timeoutId = setTimeout(() => {
      smoothScrollTo(hash, offset);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [offset]);
};