import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../zustand/AuthUsers";

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore();
  console.log(user);
  
  return !user ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;