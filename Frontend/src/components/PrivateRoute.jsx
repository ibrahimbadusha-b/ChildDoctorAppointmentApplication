import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase-config.js";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
