const PERMISSIONS = Object.freeze({
  USERS_READ: "users.read", USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update", USERS_DEACTIVATE: "users.deactivate",
  INVENTORY_READ: "inventory.read", INVENTORY_CREATE: "inventory.create",
  INVENTORY_UPDATE: "inventory.update", INVENTORY_MOVE: "inventory.move",
  SALES_READ: "sales.read", SALES_CREATE: "sales.create",
  SALES_UPDATE: "sales.update", SALES_CANCEL: "sales.cancel",
  SALES_PRODUCTS_READ: "sales.products.read",
  SALES_PRODUCTS_MANAGE: "sales.products.manage",
  AUDIT_READ: "audit.read", ANALYTICS_READ: "analytics.read",
  CASH_OPEN: "cash.open", CASH_CLOSE: "cash.close"
});
const ROLE_PERMISSIONS = Object.freeze({
  ADMIN_APP: Object.freeze(Object.values(PERMISSIONS)),
  ADMIN_TIENDA: Object.freeze(Object.values(PERMISSIONS)),
  MESERO: Object.freeze([
    PERMISSIONS.SALES_READ, PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_PRODUCTS_READ
  ]),
  COCINA: Object.freeze([PERMISSIONS.SALES_PRODUCTS_READ]),
  BODEGA: Object.freeze([
    PERMISSIONS.INVENTORY_READ, PERMISSIONS.INVENTORY_CREATE,
    PERMISSIONS.INVENTORY_UPDATE, PERMISSIONS.INVENTORY_MOVE,
    PERMISSIONS.SALES_PRODUCTS_READ
  ]),
  CAJERO: Object.freeze([
    PERMISSIONS.SALES_READ, PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_UPDATE, PERMISSIONS.SALES_PRODUCTS_READ,
    PERMISSIONS.CASH_OPEN, PERMISSIONS.CASH_CLOSE
  ]),
  LECTURA: Object.freeze([
    PERMISSIONS.INVENTORY_READ, PERMISSIONS.SALES_READ,
    PERMISSIONS.SALES_PRODUCTS_READ, PERMISSIONS.ANALYTICS_READ
  ])
});
const permissionsForRole = (role) => ROLE_PERMISSIONS[role] ?? [];
const hasPermission = (role, permission) => permissionsForRole(role).includes(permission);
const rolesForPermission = (permission) => Object.entries(ROLE_PERMISSIONS)
  .filter(([, permissions]) => permissions.includes(permission))
  .map(([role]) => role);
export { PERMISSIONS, ROLE_PERMISSIONS, permissionsForRole, hasPermission, rolesForPermission };
