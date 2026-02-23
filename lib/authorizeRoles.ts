

export const authorizeRoles = (userRole: string | undefined, roles: string[]) => {
  if (!userRole || !roles.includes(userRole)) {
    throw new Error(`Role: ${userRole} is not allowed to access this resource`);
  }
};
