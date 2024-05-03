import React, { createContext, useContext, useState } from 'react';

// 創建上下文
const LevelContext = createContext();

// 提供器組件，用於在應用程序中共享關卡狀態
export const LevelProvider = ({ children }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
      {children}
    </LevelContext.Provider>
  );
};

// 自定義鉤子，用於在任何組件中訪問選擇的關卡
export const useSelectedLevel = () => useContext(LevelContext);
