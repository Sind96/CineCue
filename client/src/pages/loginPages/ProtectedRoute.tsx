import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <p>Checking your session...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
