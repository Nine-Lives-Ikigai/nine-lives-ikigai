// src/utils/scroll.ts - Enhanced scroll utilities
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const HEADER_OFFSET = 77;

// An explicit behavior: 'smooth' overrides CSS scroll-behavior, so a
// reduced-motion media query in the stylesheet can't cover these
// calls; the user's setting has to be checked here. Evaluated per call
// so a changed OS setting applies without a reload. matchMedia is
// missing in jsdom, hence the optional calls.
const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'auto' : 'smooth';

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
      behavior: getScrollBehavior()
    });
  }
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: getScrollBehavior()
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
// descriptive name for this call site, not a separate implementation.
export const useSlimHeader = useScrollVisibility;

// Resets to the top whenever the route's pathname changes. Keyed on
// pathname rather than the full location, so hash-only changes don't
// trigger it. A layout effect, so the reset happens before paint and
// the new page never shows at the old scroll offset.
export const useResetScrollOnNavigate = (): void => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

// Scrolls to the URL hash, with the header offset, whenever the route
// or hash changes - including on first load. Keyed on the router
// location rather than on mount, since Layout stays mounted across
// route changes and a mount-only effect would never fire again after
// the first page load.
export const useHashNavigation = (offset: number = HEADER_OFFSET): void => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Small delay to ensure page is loaded
    const timeoutId = setTimeout(() => {
      smoothScrollTo(hash, offset);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash, offset]);
};