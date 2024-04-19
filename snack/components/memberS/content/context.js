import { createContext, useContext, useEffect, useState } from "react";

const BackContext = createContext();
 
 

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(emptyAuth);
 
 

  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: "Bearer " + auth.token };
    } else {
      return {}
    }
  };

  useEffect(() => {
    const str = localStorage.getItem(storageKey);
    try {
      const data = JSON.parse(str);
      if (data) {
        setAuth(data);
      }
    } catch (ex) {}
  }, []);
  return (
    <AuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自訂的 hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
