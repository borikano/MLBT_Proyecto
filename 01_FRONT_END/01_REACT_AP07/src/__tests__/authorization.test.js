import { describe, expect, it } from "vitest"

import {
  filterNavigationItems,
  getSessionRole,
  hasPermission,
} from "@/security/authorization"
import { PERMISSIONS } from "@/security/permissions"

describe("frontend authorization contract", () => {
  it("obtiene el rol desde la sesión autenticada", () => {
    expect(getSessionRole({ user: { rol: "CAJERO" } })).toBe("CAJERO")
    expect(getSessionRole({ rol: "LECTURA" })).toBe("LECTURA")
  })

  it("aplica deny-by-default a roles desconocidos", () => {
    expect(hasPermission("DESCONOCIDO", PERMISSIONS.SALES_READ)).toBe(false)
  })

  it("conserva restricciones críticas de la matriz", () => {
    expect(hasPermission("COCINA", PERMISSIONS.SALES_READ)).toBe(false)
    expect(hasPermission("BODEGA", PERMISSIONS.SALES_READ)).toBe(false)
    expect(hasPermission("CAJERO", PERMISSIONS.SALES_CANCEL)).toBe(false)
    expect(hasPermission("LECTURA", PERMISSIONS.USERS_READ)).toBe(false)
  })

  it("permite las capacidades operativas esperadas", () => {
    expect(hasPermission("MESERO", PERMISSIONS.SALES_CREATE)).toBe(true)
    expect(hasPermission("BODEGA", PERMISSIONS.INVENTORY_MOVE)).toBe(true)
    expect(hasPermission("CAJERO", PERMISSIONS.CASH_CLOSE)).toBe(true)
    expect(hasPermission("LECTURA", PERMISSIONS.ANALYTICS_READ)).toBe(true)
  })

  it("filtra navegación principal y acciones hijas por permiso", () => {
    const items = [
      { label: "Dashboard", to: "/dashboard" },
      {
        label: "Inventario",
        to: "/inventario",
        permission: PERMISSIONS.INVENTORY_READ,
        children: [
          { label: "Resumen", to: "/inventario/resumen", permission: PERMISSIONS.INVENTORY_READ },
          { label: "Mover", to: "/inventario/movimientos", permission: PERMISSIONS.INVENTORY_MOVE },
        ],
      },
    ]

    const visible = filterNavigationItems(items, "LECTURA")
    expect(visible.map((item) => item.label)).toEqual(["Dashboard", "Inventario"])
    expect(visible[1].children.map((item) => item.label)).toEqual(["Resumen"])
  })
})
