
import React, { useState, useRef, useEffect } from 'react';
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
import { DataProvider, useData } from './src/context/DataContext';
import AdminFloatingPanel from './src/components/AdminFloatingPanel';

// Component to handle background music logic
const BackgroundMusicPlayer: React.FC = () => {
    const { data } = useData();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (data.backgroundMusic && audioRef.current) {
            // Attempt auto-play. Browsers often block this without interaction.
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => {
                    console.warn("Auto-play blocked by browser policy:", e);
                    setIsPlaying(false);
                });
        }
    }, [data.backgroundMusic]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!data.backgroundMusic) return null;

    return (
        <>
            <audio ref={audioRef} src={data.backgroundMusic} loop />
            <button
                onClick={togglePlay}
                className={`fixed bottom-24 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 border-2 border-white ${isPlaying ? 'bg-green-500 text-white animate-spin-slow' : 'bg-gray-200 text-gray-500'}`}
                style={{ animationDuration: '4s' }}
                title={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
            >
                <i className={`fa-solid ${isPlaying ? 'fa-music' : 'fa-play'}`}></i>
            </button>
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow linear infinite;
                }
            `}</style>
        </>
    );
};

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
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/team/:id" element={<TeamDetail />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
          
          {/* Global Features */}
          <AdminFloatingPanel />
          <BackgroundMusicPlayer />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
