import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import CatDetail from './pages/CatDetail';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import About from './pages/About';
import Foster from './pages/Foster';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

// Data
import {
  homeData,
  adoptData,
  catDetailData,
  donateData,
  contactData,
  aboutData,
  fosterData,
  notFoundData,
  privacyData,
} from './utils/data';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout pagename="Home">
            <Home data={homeData} />
          </Layout>
        } />

        <Route path="/adopt" element={
          <Layout pagename="Adopt">
            <Adopt data={adoptData} />
          </Layout>
        } />

        <Route path="/adopt/:id" element={
          <Layout pagename="Cat Details">
            <CatDetail data={catDetailData} />
          </Layout>
        } />

        <Route path="/donate" element={
          <Layout pagename="Donate">
            <Donate data={donateData} />
          </Layout>
        } />

        <Route path="/contact" element={
          <Layout pagename="Contact">
            <Contact data={contactData} />
          </Layout>
        } />

        <Route path="/who-we-are" element={
          <Layout pagename="Who We Are">
            <About data={aboutData} />
          </Layout>
        } />

        <Route path="/foster" element={
          <Layout pagename="Foster">
            <Foster data={fosterData} />
          </Layout>
        } />

        <Route path="/privacy-policy" element={
          <Layout pagename="Privacy Policy">
            <PrivacyPolicy data={privacyData} />
          </Layout>
        } />

        <Route path="*" element={
          <Layout pagename="Page Not Found">
            <NotFound data={notFoundData} />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;