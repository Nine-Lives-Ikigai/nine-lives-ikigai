import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHashNavigation } from '../../utils/scroll';
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

  // Handle hash navigation on page load
  useHashNavigation(77);

  useEffect(() => {
    // Set page title
    document.title = `Nine Lives Ikigai - ${pagename}`;
  }, [pagename]);

  return (
    <>
      <div id="section-top">
        <div className="main-content" style={mainContent}>
          <Header pageRef={pageRef} />
          
          {children}

          <ScrollToTop pageRef={pageRef} />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;