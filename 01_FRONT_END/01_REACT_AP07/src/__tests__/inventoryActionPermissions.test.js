import { describe, expect, it } from "vitest"

import { hasPermission } from "@/security/authorization"
import { PERMISSIONS } from "@/security/permissions"

describe("inventory action permissions", () => {
  it("permite a BODEGA operar inventario", () => {
    expect(hasPermission("BODEGA", PERMISSIONS.INVENTORY_CREATE)).toBe(true)
    expect(hasPermission("BODEGA", PERMISSIONS.INVENTORY_UPDATE)).toBe(true)
    expect(hasPermission("BODEGA", PERMISSIONS.INVENTORY_MOVE)).toBe(true)
  })

  it("mantiene LECTURA en modo consulta", () => {
    expect(hasPermission("LECTURA", PERMISSIONS.INVENTORY_READ)).toBe(true)
    expect(hasPermission("LECTURA", PERMISSIONS.INVENTORY_CREATE)).toBe(false)
    expect(hasPermission("LECTURA", PERMISSIONS.INVENTORY_UPDATE)).toBe(false)
    expect(hasPermission("LECTURA", PERMISSIONS.INVENTORY_MOVE)).toBe(false)
  })

  it("niega acciones de inventario a roles sin capacidad operativa", () => {
    expect(hasPermission("MESERO", PERMISSIONS.INVENTORY_CREATE)).toBe(false)
    expect(hasPermission("CAJERO", PERMISSIONS.INVENTORY_UPDATE)).toBe(false)
    expect(hasPermission("COCINA", PERMISSIONS.INVENTORY_MOVE)).toBe(false)
  })
})
