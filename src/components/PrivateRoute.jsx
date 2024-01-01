import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component, ...props }) => {
  const isLogin = localStorage.getItem("token");

  return isLogin ? <Component {...props} /> : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
