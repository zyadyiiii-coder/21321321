
import React, { createContext, useContext, useState } from 'react';
import { AppConfig } from '../types';
import { APP_DATA } from '../data/config';

interface DataContextType {
  data: AppConfig;
  updateData: (newData: AppConfig) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType>({
  data: APP_DATA,
  updateData: () => {},
  resetData: () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('site_config_v2');
      return saved ? JSON.parse(saved) : APP_DATA;
    } catch (e) {
      return APP_DATA;
    }
  });

  const updateData = (newData: AppConfig) => {
    setData(newData);
    try {
      localStorage.setItem('site_config_v2', JSON.stringify(newData));
    } catch (e) {
      console.warn("Storage quota exceeded or error", e);
      alert("注意：本地缓存已满（图片太多），建议先导出配置保存，否则刷新后可能会丢失新图片。");
    }
  };

  const resetData = () => {
    if(window.confirm('确定要重置所有修改，恢复到默认配置吗？')) {
        setData(APP_DATA);
        localStorage.removeItem('site_config_v2');
        window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};
