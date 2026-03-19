import { createContext, useEffect, useState } from "react";
import api from "../utils/axios";

interface AuthContextType {
  token: string | null;
  login: (login: string, password: string) => Promise<void>;
  signup: (login: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  const login = async (login: string, password: string) => {
    const res = await api.post("/login", { login, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const signup = async (login: string, password: string) => {
    const res = await api.post("/signup", { login, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
