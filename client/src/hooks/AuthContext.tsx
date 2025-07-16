import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType } from "../@types/authContext.types";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await API.get("/auth/check");
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    await API.post("/auth/login", { email, password });
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, login, logout }}>
      {children};
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
