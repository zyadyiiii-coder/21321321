import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useData();
  const category = data.services.find(s => s.id === id);

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
            <div className="flex flex-col gap-6">
            {category.items.map((item, index) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative group">
                        {/* Logic to display Video or Image */}
                        {item.videoUrl ? (
                          <div className="w-full aspect-video bg-black">
                            <video 
                              controls 
                              className="w-full h-full" 
                              poster={item.imageUrl}
                              preload="metadata"
                            >
                              <source src={item.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : (
                          <>
                            <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                          </>
                        )}
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                           <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.title}</h3>
                           {item.videoUrl && (
                             <span className="text-xs font-bold text-brand-red border border-brand-red px-1.5 py-0.5 rounded">VIDEO</span>
                           )}
                        </div>
                        {item.description && (
                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
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