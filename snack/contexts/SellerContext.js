// /contexts/SellerContext.js
import { createContext, useContext, useState } from "react";

export const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);

  return (
    <SellerContext.Provider value={{ seller, setSeller }}>
      {children}
    </SellerContext.Provider>
  );
};
