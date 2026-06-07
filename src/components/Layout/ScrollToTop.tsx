// src/components/Layout/ScrollToTop.tsx
import { useScrollVisibility } from '../../utils/scroll';
import { smoothScrollTo } from '../../utils/scroll';

const ScrollToTop = ({ pageRef }) => {
  const isVisible = useScrollVisibility(100);

  const handleClick = (e) => {
    e.preventDefault();
    smoothScrollTo('#section-top', 0); // No offset for top scroll
  };

  return (
    <a 
      className="button button__return-top"
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden'
      }}
      href="#section-top"
      onClick={handleClick}
    >
      <span>→</span>
    </a>
  );
};

export default ScrollToTop;