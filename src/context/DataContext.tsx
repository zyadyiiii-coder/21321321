import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { APP_DATA } from '../data/config';
import { AppConfig } from '../types';

interface DataContextType {
  data: AppConfig;
  updateData: (newData: AppConfig) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'yidaojiahua_app_config_v1';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppConfig>(APP_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with default APP_DATA to ensure structure (simple merge)
        setData({ ...APP_DATA, ...parsed });
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateData = (newData: AppConfig) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const resetData = () => {
    if (confirm('确定要重置所有数据到初始状态吗？您的修改将丢失。')) {
      setData(APP_DATA);
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  if (!isLoaded) return null;

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
