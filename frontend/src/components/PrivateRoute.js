// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role
  if (role && user.role !== role) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default PrivateRoute;
