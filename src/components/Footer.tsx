
import React from 'react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { data } = useData();
  
  return (
    <footer className="bg-neutral-900 text-white pb-24 pt-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Brand Logos in Footer */}
        {data.brandLogos && data.brandLogos.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 border-b border-gray-800 pb-8">
              {data.brandLogos.map((brand) => (
                   <img 
                     key={brand.id}
                     src={brand.imageUrl} 
                     alt={brand.name} 
                     className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                     title={brand.name}
                   />
              ))}
            </div>
        )}

        <h2 className="text-2xl font-bold mb-2 text-brand-light">YIDAOJIAHUA</h2>
        <p className="text-gray-400 text-sm mb-8">{data.slogan}</p>
        
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-3">
             <i className="fa-solid fa-phone text-brand-red"></i>
             <div className="flex flex-col text-left">
                {data.contact.phone.map(num => (
                    <a key={num} href={`tel:${num}`} className="text-lg font-semibold hover:text-brand-light">{num}</a>
                ))}
             </div>
          </div>
          <div className="flex items-center justify-center gap-3">
             <i className="fa-solid fa-location-dot text-brand-red"></i>
             <span>{data.contact.address}</span>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
           <p className="text-xs text-gray-600">
             © {new Date().getFullYear()} {data.contact.companyName}
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
