
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
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
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm overflow-hidden">
           {category.iconUrl ? (
             <img src={category.iconUrl} alt={category.title} className="w-10 h-10 object-contain brightness-0 invert" />
           ) : (
             <i className={`fa-solid ${category.icon} text-3xl`}></i>
           )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.items.map((item, index) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                >
                <Link to={`/project/${item.id}`} className="block h-full">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      <div className="relative group aspect-video">
                          <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                          
                          {/* Play Icon for Video Items */}
                          {item.videoUrl && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                   {data.uiIcons?.play ? (
                                      <img src={data.uiIcons.play} alt="Play" className="w-6 h-6 object-contain" />
                                   ) : (
                                      <i className="fa-solid fa-play text-brand-red ml-1"></i>
                                   )}
                                </div>
                             </div>
                          )}

                          {/* Headphone Icon for Music Items */}
                          {item.audioUrl && !item.videoUrl && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                   <i className="fa-solid fa-headphones text-brand-red"></i>
                                </div>
                             </div>
                          )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2">{item.title}</h3>
                          </div>
                          {item.description && (
                              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-2">{item.description}</p>
                          )}
                          <div className="mt-auto pt-2 flex items-center text-xs text-brand-red font-medium">
                             <span>查看详情</span>
                             <i className="fa-solid fa-arrow-right ml-1"></i>
                          </div>
                      </div>
                  </div>
                </Link>
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
