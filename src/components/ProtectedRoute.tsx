import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Route } from 'react-router-dom';
import { FirebaseContext } from '../contexts/FirebaseContext';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export function ProtectedRoute({ redirectTo, component, isAuthenticated, ...rest }: any) {
  
  const routeComponent;
  if (user == null) {
    navigate('/');
  } else{
    React.createElement(component, props)
  }
  const routeComponent = (props: any) => (
    isAuthenticated
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
}