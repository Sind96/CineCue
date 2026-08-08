import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type RequireAuthProps = {
  children: ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <p>Checking your session...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default RequireAuth;
