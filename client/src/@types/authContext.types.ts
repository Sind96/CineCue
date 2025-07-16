export interface AuthContextType {
  isAuthenticated: boolean;
  // setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
