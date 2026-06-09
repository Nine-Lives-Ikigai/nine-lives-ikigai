import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import NotFound from './pages/NotFound';

// Data
import { homeData, adoptData, notFoundData } from './utils/data';
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