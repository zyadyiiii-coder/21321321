
import React from 'react';
import { useData } from '../context/DataContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { data } = useData();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Helper to resolve icon source
  const getIcon = (iconName: string, fallbackClass: string) => {
    const customIcon = data.uiIcons?.[iconName];
    if (customIcon) {
        return <img src={customIcon} alt={iconName} className="w-full h-full object-contain" />;
    }
    return <i className={fallbackClass}></i>;
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-red text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-white text-brand-red rounded-full flex items-center justify-center font-bold text-lg border-2 border-white overflow-hidden">
            {getIcon('logo', 'not-italic')}
            {!data.uiIcons?.logo && "译"}
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-none tracking-wide">{data.companyName}</h1>
            <span className="text-[0.6rem] opacity-90 tracking-widest">YIDAOJIAHUA</span>
          </div>
        </Link>
        
        {!isHome && (
          <Link to="/" className="text-sm opacity-90 hover:opacity-100 w-6 h-6 flex items-center justify-center">
            {getIcon('home', 'fa-solid fa-house')}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
