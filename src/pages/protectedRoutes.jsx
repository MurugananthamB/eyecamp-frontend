// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check if user is logged in

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
  }

  // If logged in, render the protected component
  return element;
};

export default ProtectedRoute;
