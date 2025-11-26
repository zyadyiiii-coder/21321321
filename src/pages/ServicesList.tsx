import React from 'react';
import { APP_DATA } from '../data/config';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicesList: React.FC = () => {
  const data = APP_DATA;
  
  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="py-8 px-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">全部案例</h1>
        <p className="text-gray-500 text-sm mt-1">Our Portfolio</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {data.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/services/${service.id}`}
                className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 active:bg-gray-100 transition-colors"
              >
                <div className="w-16 h-16 rounded-lg bg-white shrink-0 flex items-center justify-center shadow-sm text-brand-red text-2xl">
                    <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="font-bold text-gray-800">{service.title}</h3>
                    <p className="text-xs text-gray-400 uppercase mt-0.5">{service.subtitle}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{service.description}</p>
                </div>
                <div className="ml-2 text-gray-300">
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;