// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Adopt from './pages/Adopt';

// Data
import { homeData, adoptData } from './utils/data';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={
          <Layout pagename="Home">
            <Home data={homeData} />
          </Layout>
        } />

        {/* Adopt page */}
        <Route path="/adopt" element={
          <Layout pagename="Adopt">
            <Adopt data={adoptData} />
          </Layout>
        } />
        
        {/* 404 page */}
        <Route path="*" element={
          <Layout pagename="Page Not Found">
            <div className="flex-content flex--center flex--tall">
              <section className="section section__hero section__hero--page">
                <div className="section__container">
                  <div className="section__content">
                    <div className="xl-card">
                      <h1 className="xl-card__title">404 - Page Not Found</h1>
                      <p>The page you're looking for doesn't exist.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;