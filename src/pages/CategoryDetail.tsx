import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { APP_DATA } from '../data/config';
import { motion } from 'framer-motion';

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = APP_DATA.services.find(s => s.id === id);

  if (!category) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header Banner */}
      <div className="bg-brand-red text-white py-12 px-6 text-center rounded-b-[2rem] shadow-lg mb-8">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
           <i className={`fa-solid ${category.icon} text-3xl`}></i>
        </div>
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        <p className="opacity-80 text-sm uppercase tracking-wider">{category.subtitle}</p>
        <p className="mt-4 text-sm max-w-lg mx-auto opacity-90">{category.description}</p>
      </div>

      {/* Grid Content */}
      <div className="max-w-4xl mx-auto px-4">
        {category.items.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
                <i className="fa-regular fa-folder-open text-4xl mb-4"></i>
                <p>暂无案例展示</p>
            </div>
        ) : (
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
            {category.items.map((item, index) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid"
                >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative group">
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                        {/* Overlay effect */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2">{item.title}</h3>
                        {item.description && (
                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                        )}
                        {/* Simulated Video Badge */}
                        {category.id === 'video' && (
                             <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-brand-red rounded text-xs font-medium">
                                <i className="fa-solid fa-play-circle"></i> 视频案例
                             </div>
                        )}
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;