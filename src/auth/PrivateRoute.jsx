import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const data = localStorage.getItem("auth-storage");
  const token = JSON.parse(data) 
  return token?.state?.token ? children : <Navigate to="/signin" />;
};

export const PublicRoute = ({ children }) => {
   return children;
  //const data = localStorage.getItem("auth-storage");
  //const token = JSON.parse(data) 
  //return token?.state?.token ? <Navigate to="/" /> : children;
};


