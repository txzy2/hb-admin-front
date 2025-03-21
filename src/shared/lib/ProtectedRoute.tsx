import React from 'react';
import {Navigate} from 'react-router-dom';
import useAuthStore from '@/store/auth/auth-store';

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
