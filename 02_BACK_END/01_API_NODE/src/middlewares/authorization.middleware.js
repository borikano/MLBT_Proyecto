import { allowRoles } from "./auth.middleware.js";
import { rolesForPermission } from "../security/permissions.js";
function allowPermissions(...permissions) {
  const requested = [...new Set(permissions.filter(Boolean))];
  if (requested.length === 0) {
    throw new TypeError("At least one permission is required.");
  }
  const roles = [...new Set(requested.flatMap(rolesForPermission))];
  if (roles.length === 0) {
    throw new Error(`No roles configured for permissions: ${requested.join(", ")}`);
  }
  return allowRoles(...roles);
}
export { allowPermissions };
