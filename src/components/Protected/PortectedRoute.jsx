import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/AuthUsers";

const ProtectedRoute = ({
  rolesAllowed = [],
  requireAll = false,
  children
}) => {
  const {user} = useAuthStore();

  // si el usuario no esta autenticado
  if (!user) {
    return <Navigate to="/home" replace />;
  }
  //sacamos el tipo del usuario autenticado
  const userRoles = user?.tipo_serv || [];
  
  const hasAccess = requireAll
    ? rolesAllowed.every(role => userRoles.includes(role))
    : rolesAllowed.some(role => userRoles.includes(role));

  return hasAccess ? children : <Navigate to="/403" replace />;
};

export default ProtectedRoute;