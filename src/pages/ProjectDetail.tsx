
import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useData();
  
  // Find project in any category
  let projectItem = null;
  for (const category of data.services) {
    const item = category.items.find(i => i.id === id);
    if (item) {
      projectItem = item;
      break;
    }
  }

  if (!projectItem) {
    return <Navigate to="/" />;
  }

  // Helpers for icons
  const getIcon = (name: string, fallback: React.ReactNode) => {
    return data.uiIcons?.[name] ? (
        <img src={data.uiIcons[name]} className="w-full h-full object-contain" />
    ) : fallback;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
       {/* Top Navigation Bar */}
       <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-red">
             {getIcon('back', <i className="fa-solid fa-arrow-left"></i>)}
          </button>
          <h1 className="flex-1 text-center font-bold text-gray-800 text-sm truncate px-4">{projectItem.title}</h1>
          <div className="w-8"></div> {/* Spacer for center alignment */}
       </div>

       {/* Media Section (Video or Main Image) */}
       <div className="w-full bg-black">
          {projectItem.videoUrl ? (
             <div className="aspect-video w-full max-w-4xl mx-auto">
                <video 
                   controls 
                   className="w-full h-full" 
                   poster={projectItem.imageUrl}
                   playsInline
                >
                   <source src={projectItem.videoUrl} type="video/mp4" />
                   Your browser does not support the video tag.
                </video>
             </div>
          ) : (
             <div className="w-full max-w-4xl mx-auto">
                <img src={projectItem.imageUrl} alt={projectItem.title} className="w-full h-auto" />
             </div>
          )}
       </div>

       {/* Audio Player */}
       {projectItem.audioUrl && (
           <div className="max-w-3xl mx-auto px-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0">
                         <i className="fa-solid fa-music"></i>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">试听音频</p>
                        <audio controls className="w-full h-8">
                            <source src={projectItem.audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
           </div>
       )}

       {/* Content Section */}
       <div className="max-w-3xl mx-auto px-6 py-8">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h2 className="text-2xl font-bold text-gray-900 mb-4">{projectItem.title}</h2>
             <div className="w-10 h-1 bg-brand-red mb-6"></div>
             <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {projectItem.description}
             </div>
           </motion.div>

           {/* Gallery Section */}
           {projectItem.gallery && projectItem.gallery.length > 0 && (
             <div className="mt-12">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                   <span className="w-1 h-4 bg-brand-red mr-2"></span>
                   精彩图集
                </h3>
                <div className="space-y-4">
                   {projectItem.gallery.map((imgUrl, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                         <img 
                           src={imgUrl} 
                           alt={`${projectItem?.title} - ${index + 1}`} 
                           className="w-full h-auto rounded-lg shadow-sm"
                           loading="lazy"
                         />
                      </motion.div>
                   ))}
                </div>
             </div>
           )}
       </div>
    </div>
  );
};

export default ProjectDetail;
