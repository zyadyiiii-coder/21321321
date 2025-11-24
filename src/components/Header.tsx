import React from 'react';
import { APP_DATA } from '../data/config';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-brand-red text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo Placeholder - You can replace with <img src="..." /> */}
          <div className="w-8 h-8 bg-white text-brand-red rounded-full flex items-center justify-center font-bold text-lg border-2 border-white">
            译
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none tracking-wide">{APP_DATA.companyName}</h1>
            <span className="text-[0.6rem] opacity-90 tracking-widest">YIDAOJIAHUA</span>
          </div>
        </Link>
        
        {!isHome && (
          <Link to="/" className="text-sm opacity-90 hover:opacity-100">
            <i className="fa-solid fa-house"></i>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;