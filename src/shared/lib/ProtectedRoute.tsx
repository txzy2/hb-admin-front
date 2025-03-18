import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;