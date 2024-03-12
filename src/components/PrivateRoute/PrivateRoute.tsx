import { AuthContext } from "contexts/AuthProvider";
import React, { useContext } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
