import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { userLoggedIn } = useContext(AuthContext);

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Route element={element} {...rest} />;
};

export default PrivateRoute;

