import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
