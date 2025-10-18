import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("idToken");

  if (!user || !token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}
