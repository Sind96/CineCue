import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, User } from "../@types/authContext.types";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await API.get("/auth/check");
      if (res.status === 200) {
        setIsAuthenticated(true);
        setUser(res.data.user);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        console.error("Login Failed:", error);
      }
    }
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, checkAuth, login, logout }}
    >
      {children}
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
