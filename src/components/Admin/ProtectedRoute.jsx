import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminStore from '../../store/adminStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
