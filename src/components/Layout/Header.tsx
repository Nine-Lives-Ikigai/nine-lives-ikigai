import { useState, type MouseEvent, type ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { headerData } from '../../utils/data';
import { smoothScrollTo, scrollToTop, useSlimHeader, HEADER_OFFSET } from '../../utils/scroll';

const Header = () => {
  const { brand, navToggle, links } = headerData;
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
              {brand}
            </a>
          ) : (
            <Link
              className="button"
              to="/"
              onClick={closeNav}
            >
              {brand}
            </Link>
          )}
        </div>

        <div className="header-controls__nav-toggle">
          <input
            type="checkbox"
            name="nav-toggle"
            aria-label={isNavOpen ? navToggle.closeLabel : navToggle.openLabel}
            checked={isNavOpen}
            onChange={handleNavToggle}
          />
          <span className="nav-icon"></span>
        </div>

        <ul className={isNavOpen ? 'show-nav' : ''}>
          {links.map((link) => {
            // Hash hrefs are home-page sections; everything else is a route.
            const isScrollLink = link.href.startsWith('#');
            const className = link.variant ? `button ${link.variant}` : 'button';
            return (
              <li key={link.href}>
                {isScrollLink ? (
                  <a
                    className={className}
                    href={link.href}
                    data-scroll="true"
                    onClick={(e) => handleScrollClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link className={className} to={link.href} onClick={closeNav}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;