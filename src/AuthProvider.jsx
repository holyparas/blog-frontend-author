import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getToken as getTokenLocal,
  setToken as setTokenLocal,
  clearToken as clearTokenLocal,
} from "./auth";
import { decodeToken } from "./auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getTokenLocal());
  const [user, setUser] = useState(() => decodeToken(getTokenLocal()));

  useEffect(() => {
    setUser(token ? decodeToken(token) : null);
  }, [token]);

  // keep in sync with other tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") {
        setToken(getTokenLocal());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = (newToken) => {
    setTokenLocal(newToken);
    setToken(newToken);
  };

  const logout = () => {
    clearTokenLocal();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
