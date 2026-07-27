import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../api/auth.api";
import type { LoginInput, User } from "../types/auth.types";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (input: LoginInput): Promise<User> => {
    const loggedInUser = await loginUser(input);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async (): Promise<void> => {
    await logoutUser();
    setUser(null);
  };

  useEffect(() => {
    void checkAuth();
  }, []);

  const value = {
    user,
    authLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
