import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_DATA } from '../data/config';

const BottomNav: React.FC = () => {
  const data = APP_DATA;
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe-area">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto">
        <Link 
          to="/" 
          onClick={handleScrollToTop}
          className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/' ? 'text-brand-red' : 'text-gray-500'}`}
        >
          <i className="fa-solid fa-house text-xl mb-1"></i>
          <span className="text-xs">首页</span>
        </Link>
        
        <a 
          href={`tel:${data.contact.phone[0]}`}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-brand-red"
        >
          <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white -mt-6 shadow-lg border-4 border-white">
             <i className="fa-solid fa-phone text-xl"></i>
          </div>
          <span className="text-xs mt-1">一键拨号</span>
        </a>

        <Link 
          to="/services" 
          onClick={handleScrollToTop}
           className={`flex flex-col items-center justify-center w-full h-full ${location.pathname.startsWith('/services') ? 'text-brand-red' : 'text-gray-500'}`}
        >
          <i className="fa-solid fa-grid-2 text-xl mb-1"></i>
          <span className="text-xs">案例</span>
        </Link>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
    </div>
  );
};

export default BottomNav;