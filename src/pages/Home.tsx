import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { data } = useData();
  
  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-brand-red overflow-hidden flex flex-col items-center justify-center text-center text-white p-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-6xl font-black mb-2 font-sans italic tracking-tighter">YIDAO</h1>
          <h2 className="text-2xl font-light tracking-[0.5em] mb-6">译道佳华</h2>
          <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl font-medium">{data.slogan}</p>
        </motion.div>
      </div>

      {/* Intro Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-brand-red"></div>
            <h3 className="text-2xl font-bold text-gray-800">公司简介</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-justify">
            {data.description}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                <p className="text-brand-red font-bold text-xl">10+</p>
                <p className="text-xs text-gray-500">年品牌经验</p>
             </div>
             <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                <p className="text-brand-red font-bold text-xl">100+</p>
                <p className="text-xs text-gray-500">成功案例</p>
             </div>
          </div>
        </div>
      </section>

      {/* Core Personnel Section */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
             <div className="inline-block bg-brand-red text-white px-4 py-2 text-lg font-bold rounded-sm shadow-md">
                核心人员简介
             </div>
             <p className="text-gray-400 text-xs mt-2 uppercase">Core Personnel</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.team.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-md relative group">
                   <img 
                     src={member.imageUrl} 
                     alt={member.role} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   {/* Red overlay on hover similar to PDF style */}
                   <div className="absolute inset-0 bg-brand-red/80 opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-sm font-bold text-gray-800">{member.name}</h4>
                <p className="text-xs text-brand-red font-medium mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">经营范围</h3>
            <p className="text-gray-400 text-sm uppercase">Service Businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/services/${service.id}`} className="block group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 bg-gray-200 relative overflow-hidden">
                       {/* Use the first item's image as cover, or a gradient if empty */}
                       {service.items.length > 0 ? (
                         <img src={service.items[0].imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       ) : (
                         <div className="w-full h-full bg-gradient-to-br from-brand-red to-brand-dark"></div>
                       )}
                       <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <i className={`fa-solid ${service.icon} text-4xl text-white opacity-80`}></i>
                       </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{service.title}</h4>
                      <p className="text-xs text-brand-red uppercase font-semibold mb-3">{service.subtitle}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub Brands */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-8">旗下品牌</h3>
            <div className="flex flex-wrap justify-center gap-6">
                <div className="border border-gray-200 rounded-lg p-6 w-full md:w-5/12 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0">
                        <i className="fa-solid fa-dragon"></i>
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold">醒狮影视</h4>
                        <p className="text-xs text-gray-500">The Awaking Lion</p>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 w-full md:w-5/12 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0">
                        <i className="fa-solid fa-music"></i>
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold">龙予成林</h4>
                        <p className="text-xs text-gray-500">Music Studio</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;