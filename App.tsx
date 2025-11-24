import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import BottomNav from './src/components/BottomNav';
import Home from './src/pages/Home';
import CategoryDetail from './src/pages/CategoryDetail';
import ServicesList from './src/pages/ServicesList';
import ScrollToTop from './src/components/ScrollToTop';
import { DataProvider } from './src/context/DataContext';
import AdminManager from './src/components/AdminManager';

// Use HashRouter for easier deployment on static servers (like basic Baota setups) without Nginx config
const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen w-full max-w-lg mx-auto bg-white shadow-2xl relative">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesList />} />
              <Route path="/services/:id" element={<CategoryDetail />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
          {/* Admin Tools */}
          <AdminManager />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;