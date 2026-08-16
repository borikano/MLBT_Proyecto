const AUDIT_RESULTS = Object.freeze({
  SUCCESS: "SUCCESS",
  DENIED: "DENIED",
  FAILURE: "FAILURE"
});

const AUDIT_MODULES = Object.freeze({
  AUTH: "auth",
  USERS: "users",
  INVENTORY: "inventory",
  SALES: "sales",
  CATALOG: "catalog"
});

const AUDIT_ACTIONS = Object.freeze({
  LOGIN: "auth.login",
  SESSION_REJECTED: "auth.session_rejected",
  PERMISSION_DENIED: "auth.permission_denied",
  USER_ROLE_CHANGED: "users.role_changed",
  USER_STATUS_CHANGED: "users.status_changed",
  USER_DEACTIVATED: "users.deactivated",
  INVENTORY_ADJUSTED: "inventory.adjusted",
  SALE_CANCELLED: "sales.cancelled",
  CATALOG_PRICE_CHANGED: "catalog.price_changed",
  CATALOG_RECIPE_CHANGED: "catalog.recipe_changed"
});

const MAX_AUDIT_METADATA_CHARS = 4000;

export {
  AUDIT_ACTIONS,
  AUDIT_MODULES,
  AUDIT_RESULTS,
  MAX_AUDIT_METADATA_CHARS
};
