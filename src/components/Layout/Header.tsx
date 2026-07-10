import { useState, type MouseEvent, type ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo, scrollToTop, useSlimHeader, HEADER_OFFSET } from '../../utils/scroll';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isSlim = useSlimHeader(100); // Add slim class when scrolled past 100px

  const handleScrollClick = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();

    if (isHomePage) {
      // If we're on home page, scroll to section with header offset
      smoothScrollTo(target, HEADER_OFFSET);
    } else {
      // If we're on another page, navigate to home with hash — useHashNavigation
      // (in Home.tsx) picks up the hash on mount and scrolls with the right offset
      navigate(`/${target}`);
    }

    // Close mobile nav after click
    setIsNavOpen(false);
  };

  const handleNavToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNavOpen(e.target.checked);
  };

  const closeNav = () => setIsNavOpen(false);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTop();
    setIsNavOpen(false);
  };

  return (
    <div className={`header-container fixed${isSlim ? ' header-container--slim' : ''}`}>
      <div className="header-controls">
        <div className="header-logo">
          {isHomePage ? (
            <a 
              className="button" 
              href="#section-top"
              onClick={handleLogoClick}
            >
              Nine Lives Ikigai
            </a>
          ) : (
            <Link 
              className="button" 
              to="/"
              onClick={closeNav}
            >
              Nine Lives Ikigai
            </Link>
          )}
        </div>
        
        <div className="header-controls__nav-toggle">
          <input 
            type="checkbox" 
            name="nav-toggle" 
            aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            checked={isNavOpen}
            onChange={handleNavToggle}
          />
          <span className="nav-icon"></span>
        </div>
        
        <ul className={isNavOpen ? 'show-nav' : ''}>
          <li>
            <Link className="button button--alt" to="/adopt" onClick={closeNav}>
              Adopt
            </Link>
          </li>
          <li>
            <Link className="button" to="/foster" onClick={closeNav}>
              Foster
            </Link>
          </li>
          <li>
            <a 
              className="button" 
              href="#services"
              data-scroll="true"
              onClick={(e) => handleScrollClick(e, '#services')}
            >
              Services
            </a>
          </li>
          <li>
            <Link className="button" to="/who-we-are" onClick={closeNav}>
              Who We Are
            </Link>
          </li>
          <li>
            <Link className="button" to="/contact" onClick={closeNav}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;