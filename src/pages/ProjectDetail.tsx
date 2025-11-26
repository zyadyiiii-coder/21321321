import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { APP_DATA } from '../data/config';
import { motion } from 'framer-motion';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find project in any category
  let projectItem = null;
  for (const category of APP_DATA.services) {
    const item = category.items.find(i => i.id === id);
    if (item) {
      projectItem = item;
      break;
    }
  }

  if (!projectItem) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
       {/* Top Navigation Bar */}
       <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-red">
             <i className="fa-solid fa-arrow-left"></i>
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

       {/* Content Section */}
       <div className="max-w-3xl mx-auto px-6 py-8">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h2 className="text-2xl font-bold text-gray-900 mb-4">{projectItem.title}</h2>
             <div className="w-10 h-1 bg-brand-red mb-6"></div>
             <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                {projectItem.description?.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                ))}
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