import { Navigate } from 'react-router-dom';
import { FirebaseContext } from '../contexts/FirebaseContext';
import React from 'react';

export function ProtectedRoute({ children, ...props }: { children: any, props: any }) {
  const { user, setUser } = React.useContext(FirebaseContext);
  if (user == null) {
    console.log("ProtectedRoute: user is null");
  }
  let isAuthenticated = user != null;
  console.log("ProtectedRoute: isAuthenticated: " + isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to={{ pathname: '/' }} />
}
