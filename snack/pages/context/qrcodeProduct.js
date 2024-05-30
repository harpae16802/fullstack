import React, { createContext, useState } from 'react';

const ClickContext = createContext();

const ClickProvider = ({ children }) => {
  const [value, setValue] = useState(null);

  return (
    <ClickContext.Provider value={{ value, setValue }}>
      {children}
    </ClickContext.Provider>
  );
};

const useData = () => {
  const [data, setData] = useState([]);
  return {
    data,
    setData,
  };
};

export default ClickProvider;
export { ClickContext, useData };
