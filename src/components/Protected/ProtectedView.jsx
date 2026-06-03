import React from "react";
import { useAuthStore } from "../../zustand/AuthUsers";

const ProtectedView = ({
  rolesAllowed = [],
  requireAll = false,
  children
}) => {
  const {user} = useAuthStore();

  // si el usuario no esta autenticado
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  //sacamos el tipo del usuario autenticado
  const userRoles = user?.tipo_serv || [];

  const hasAccess = requireAll
  ? rolesAllowed.every(role => userRoles.includes(role))
  : rolesAllowed.some(role => userRoles.includes(role)); 
  return hasAccess ? <>{children}</> : null;
};

export default ProtectedView;