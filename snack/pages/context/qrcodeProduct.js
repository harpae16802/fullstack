import React, { createContext, useState } from 'react';

const ClickContext = createContext();

const ClickProvider = ({ children }) => { 
  const [value, setValue] = useState(null); // 假設 value 初始值為 null

  const Provider = (
    <ClickContext.Provider value={{ value, setValue }}>
      {children}
    </ClickContext.Provider>
  );

  return Provider; // 將 Provider 作為變數返回
};

const useData = () => {
  const [data, setData] = useState([]); // 將 setdata 改為 setData
  return {
    data,
    setData // 將 setdata 改為 setData
  };
};

export { ClickProvider, useData };