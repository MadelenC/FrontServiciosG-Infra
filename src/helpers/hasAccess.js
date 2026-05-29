export const hasAccess = ( userRoles = [], rolesAllowed = [] ) => {
    
  if (!rolesAllowed.length) return true;

  return rolesAllowed.some(role =>
    userRoles.includes(role)
  );
};