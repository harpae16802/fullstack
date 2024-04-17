// /contexts/MemberContext.js
import { createContext, useContext, useEffect, useState } from "react";

export const MemberContext = createContext(); 

export const useMember = () => useContext(MemberContext);

export const MemberProvider = ({ children }) => {
  const [member, setMember] = useState(null);
 

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  );
};
