import { PERMISSIONS } from "@/security/permissions"

const ALL_PERMISSIONS = Object.values(PERMISSIONS)

export const ROLE_PERMISSIONS = Object.freeze({
  ADMIN_APP: ALL_PERMISSIONS,
  ADMIN_TIENDA: ALL_PERMISSIONS,
  MESERO: [
    PERMISSIONS.SALES_READ,
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_PRODUCTS_READ,
  ],
  COCINA: [PERMISSIONS.SALES_PRODUCTS_READ],
  BODEGA: [
    PERMISSIONS.INVENTORY_READ,
    PERMISSIONS.INVENTORY_CREATE,
    PERMISSIONS.INVENTORY_UPDATE,
    PERMISSIONS.INVENTORY_MOVE,
    PERMISSIONS.SALES_PRODUCTS_READ,
  ],
  CAJERO: [
    PERMISSIONS.SALES_READ,
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_UPDATE,
    PERMISSIONS.SALES_PRODUCTS_READ,
    PERMISSIONS.CASH_OPEN,
    PERMISSIONS.CASH_CLOSE,
  ],
  LECTURA: [
    PERMISSIONS.INVENTORY_READ,
    PERMISSIONS.SALES_READ,
    PERMISSIONS.SALES_PRODUCTS_READ,
    PERMISSIONS.ANALYTICS_READ,
  ],
})

export function getSessionRole(session) {
  return session?.user?.rol || session?.rol || ""
}

export function hasPermission(role, permission) {
  if (!role || !permission) {
    return false
  }

  return Boolean(ROLE_PERMISSIONS[role]?.includes(permission))
}

export function hasSessionPermission(session, permission) {
  return hasPermission(getSessionRole(session), permission)
}

export function filterNavigationItems(items, role) {
  return items
    .filter((item) => !item.permission || hasPermission(role, item.permission))
    .map((item) => {
      if (!item.children) {
        return item
      }

      return {
        ...item,
        children: item.children.filter(
          (child) => !child.permission || hasPermission(role, child.permission)
        ),
      }
    })
}
