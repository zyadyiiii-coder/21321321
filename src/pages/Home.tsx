
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const { data } = useData();
  
  const hasBgImage = !!data.heroConfig?.backgroundImage;
  const heroStyle: React.CSSProperties = hasBgImage
    ? { 
        backgroundImage: `url(${data.heroConfig?.backgroundImage})`, 
        backgroundSize: data.heroConfig?.backgroundSize || 'cover', 
        backgroundPosition: data.heroConfig?.backgroundPosition || 'center' 
      }
    : { 
        backgroundColor: data.heroConfig?.backgroundColor || '#b91c1c' 
      };
  
  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div 
        className="relative h-[65vh] overflow-hidden flex flex-col items-center justify-center text-center text-white p-6 transition-colors duration-500"
        style={heroStyle}
      >
        {!hasBgImage && (
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        )}
        {hasBgImage && (
             <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full"
        >
          <h1 className="text-6xl font-black mb-2 font-sans italic tracking-tighter">YIDAO</h1>
          <h2 className="text-2xl font-light tracking-[0.5em] mb-6">译道佳华</h2>
          <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl font-medium mb-2">{data.slogan}</p>
        </motion.div>
      </div>

      {/* Partners Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">部分服务商家</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold opacity-60">OUR PARTNERS</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.partners && data.partners.map((partner, index) => (
              <motion.div 
                key={partner.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow h-16 overflow-hidden"
              >
                 <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    title={partner.name}
                    className="w-full h-full grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                    style={{ objectFit: partner.imgStyle?.fit || 'contain', objectPosition: partner.imgStyle?.position || 'center' }}
                 />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-8 bg-brand-red"></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 leading-none">公司简介</h3>
              <p className="text-[0.6rem] text-gray-400 font-bold tracking-widest uppercase mt-1">COMPANY PROFILE</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-justify mt-4">
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

      {/* Core Personnel */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
             <div className="inline-block bg-brand-red text-white px-4 py-2 text-lg font-bold rounded-sm shadow-md">
                核心人员简介
             </div>
             <p className="text-gray-400 text-xs mt-2 uppercase tracking-wider font-bold">CORE PERSONNEL</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.team.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/team/${member.id}`} className="block group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-md relative">
                    <img 
                      src={member.imageUrl} 
                      alt={member.role} 
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      style={{ objectFit: member.imgStyle?.fit || 'cover', objectPosition: member.imgStyle?.position || 'center' }}
                    />
                    <div className="absolute inset-0 bg-brand-red/80 opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white border border-white px-3 py-1 text-xs">查看详情</span>
                    </div>
                  </div>
                  {member.name && <h4 className="text-sm font-bold text-gray-800 text-center">{member.name}</h4>}
                  <p className="text-xs text-brand-red font-medium mt-1 text-center">{member.role}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">经营范围</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">BUSINESS SCOPE</p>
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
                       {service.items.length > 0 ? (
                         <img 
                            src={service.items[0].imageUrl} 
                            alt={service.title} 
                            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                            style={{ objectFit: service.items[0].imgStyle?.fit || 'cover', objectPosition: service.items[0].imgStyle?.position || 'center' }}
                         />
                       ) : (
                         <div className="w-full h-full bg-gradient-to-br from-brand-red to-brand-dark"></div>
                       )}
                       <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          {service.iconUrl ? (
                             <img src={service.iconUrl} alt={service.title} className="w-12 h-12 object-contain brightness-0 invert" />
                          ) : (
                             <i className={`fa-solid ${service.icon} text-4xl text-white opacity-80`}></i>
                          )}
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
            <h3 className="text-xl font-bold text-gray-800 mb-1">旗下品牌</h3>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-8">SUB BRANDS</p>
            <div className="flex flex-wrap justify-center gap-6">
                {data.subBrands && data.subBrands.map((brand) => (
                    <div key={brand.id} className="border border-gray-200 rounded-lg p-6 w-full md:w-5/12 flex items-center gap-4 shadow-sm hover:border-brand-red transition-colors">
                        <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0 overflow-hidden">
                            {brand.iconUrl ? (
                                <img 
                                    src={brand.iconUrl} 
                                    alt={brand.title} 
                                    className="w-full h-full"
                                    style={{ objectFit: brand.imgStyle?.fit || 'cover', objectPosition: brand.imgStyle?.position || 'center' }}
                                />
                            ) : (
                                <i className={`fa-solid ${brand.icon} text-xl`}></i>
                            )}
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold">{brand.title}</h4>
                            <p className="text-xs text-gray-500">{brand.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
