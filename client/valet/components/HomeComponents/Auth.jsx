import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, expirationTime, setExpirationTime }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
