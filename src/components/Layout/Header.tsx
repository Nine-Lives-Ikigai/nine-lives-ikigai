import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { smoothScrollTo, useSlimHeader } from '../../utils/scroll';

const Header = ({ pageRef: _pageRef }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSlim = useSlimHeader(100); // Add slim class when scrolled past 100px

  const handleScrollClick = (e, target) => {
    e.preventDefault();
    
    if (isHomePage) {
      // If we're on home page, scroll to section with header offset
      smoothScrollTo(target, 77);
    } else {
      // If we're on another page, navigate to home with hash
      window.location.href = `/${target}`;
    }
    
    // Close mobile nav after click
    setIsNavOpen(false);
  };

  const handleNavToggle = (e) => {
    setIsNavOpen(e.target.checked);
  };

  const handleLogoClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      smoothScrollTo('#section-top', 77);
    }
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
              onClick={() => setIsNavOpen(false)}
            >
              Nine Lives Ikigai
            </Link>
          )}
        </div>
        
        <div className="header-controls__nav-toggle">
          <input 
            type="checkbox" 
            name="nav-toggle" 
            checked={isNavOpen}
            onChange={handleNavToggle}
          />
          <span className="nav-icon"></span>
        </div>
        
        <ul className={isNavOpen ? 'show-nav' : ''}>
          <li>
            <a className="button button--alt" href="/adopt">
              Adopt
            </a>
          </li>
          <li>
            <Link className="button" to="/foster" onClick={() => setIsNavOpen(false)}>
              Foster
            </Link>
          </li>
          <li>
            <a 
              className="button" 
              href="#section-about"
              data-scroll="true"
              onClick={(e) => handleScrollClick(e, '#about')}
            >
              About
            </a>
          </li>
          <li>
            <Link className="button" to="/who-we-are" onClick={() => setIsNavOpen(false)}>
              Who We Are
            </Link>
          </li>
          <li>
            <a 
              className="button" 
              href="#section-services"
              data-scroll="true"
              onClick={(e) => handleScrollClick(e, '#services')}
            >
              Services
            </a>
          </li>
          <li>
            <Link className="button" to="/contact" onClick={() => setIsNavOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;