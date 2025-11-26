import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import BottomNav from './src/components/BottomNav';
import Home from './src/pages/Home';
import CategoryDetail from './src/pages/CategoryDetail';
import ServicesList from './src/pages/ServicesList';
import ProjectDetail from './src/pages/ProjectDetail';
import TeamDetail from './src/pages/TeamDetail';
import ScrollToTop from './src/components/ScrollToTop';

// Use HashRouter for easier deployment on static servers (like basic Baota setups) without Nginx config
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen w-full max-w-lg mx-auto bg-white shadow-2xl relative">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/services/:id" element={<CategoryDetail />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/team/:id" element={<TeamDetail />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;