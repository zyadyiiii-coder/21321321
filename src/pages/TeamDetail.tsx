
import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const TeamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useData();
  const member = data.team.find(m => m.id === id);

  if (!member) {
    return <Navigate to="/" />;
  }

  const getIcon = (name: string, fallback: React.ReactNode) => {
    return data.uiIcons?.[name] ? (
        <img src={data.uiIcons[name]} className="w-full h-full object-contain" />
    ) : fallback;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
       <div className="absolute top-0 left-0 z-40 p-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur rounded-full text-gray-800 hover:text-brand-red shadow-sm">
             {getIcon('back', <i className="fa-solid fa-arrow-left"></i>)}
          </button>
       </div>

       <div className="relative h-[50vh] overflow-hidden">
          <img 
            src={member.imageUrl} 
            alt={member.role} 
            className="w-full h-full" 
            style={{ objectFit: member.imgStyle?.fit || 'cover', objectPosition: member.imgStyle?.position || 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
       </div>

       <div className="max-w-3xl mx-auto px-6 -mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white"
          >
             <h1 className="text-3xl font-bold text-gray-900 mb-2">{member.name || "核心成员"}</h1>
             <p className="text-brand-red font-semibold text-lg mb-6">{member.role}</p>
             
             <div className="w-12 h-1 bg-gray-200 mb-6"></div>
             
             <div className="text-gray-600 leading-loose text-justify mb-10 whitespace-pre-line">
                {member.bio || "暂无详细介绍。"}
             </div>

             {member.works && member.works.length > 0 && (
                <div>
                   <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-brand-red pl-3">个人作品 / 案例</h3>
                   <div className="grid grid-cols-1 gap-4">
                      {member.works.map((workImg, idx) => (
                         <img 
                           key={idx} 
                           src={workImg} 
                           alt="Work Sample" 
                           className="w-full h-auto rounded-lg shadow-sm"
                         />
                      ))}
                   </div>
                </div>
             )}
          </motion.div>
       </div>
    </div>
  );
};

export default TeamDetail;
