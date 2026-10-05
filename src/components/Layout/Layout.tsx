import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHashNavigation, useScrollToTopOnNavigate } from '../../utils/scroll';
import { useLayoutStyles } from '../../utils/layout';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, pagename = 'Home' }) => {
  const location = useLocation();
  const {mainContent} = useLayoutStyles();
  
  // Equivalent to pageRef logic - determine if we're on home page
  const isHomePage = location.pathname === '/';
  const pageRef = isHomePage ? '' : '/';

  // Reset to the top on every route change
  useScrollToTopOnNavigate();

  // Scroll to the URL hash (with header offset) on route or hash change
  useHashNavigation(77);

  useEffect(() => {
    // Set page title
    document.title = `Nine Lives Ikigai - ${pagename}`;
  }, [pagename]);

  return (
    <>
      <div id="section-top" className="main-content" style={mainContent}>
        <Header />
        
        {children}

        <ScrollToTop pageRef={pageRef} />

        <Footer />
      </div>
    </>
  );
};

export default Layout;