import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  return children;
};

export default ProtectedRoute;
