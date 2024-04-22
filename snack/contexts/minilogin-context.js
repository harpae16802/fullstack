import React, { createContext, useState } from 'react';

const MiniloginContext = createContext();

const MiniloginProvider = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState('type2');

  const handleLinkClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <MiniloginContext.Provider value={{ selectedContent, handleLinkClick }}>
      {children}
    </MiniloginContext.Provider>
  );
};

export { MiniloginProvider, MiniloginContext };