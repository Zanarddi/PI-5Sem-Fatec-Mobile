import { Navigate } from 'react-router-dom';
import { FirebaseContext } from '../contexts/FirebaseContext';
import React from 'react';

export function ProtectedRoute({ children, ...props }: { children: any, props: any }) {
  const { user, setUser } = React.useContext(FirebaseContext);
  let isAuthenticated = user != null;
  return isAuthenticated ? children : <Navigate to={{ pathname: '/' }} />
}
