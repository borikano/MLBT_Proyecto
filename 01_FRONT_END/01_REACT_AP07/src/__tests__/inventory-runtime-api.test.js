import fs from "node:fs"

import {
  describe,
  expect,
  it,
} from "vitest"

describe("Inventario runtime API", () => {
  it("InventarioProvider usa API real y no fixtures de negocio", () => {
    const source = fs.readFileSync(
      "src/features/inventario/InventarioProvider.jsx",
      "utf8"
    )

    expect(source).toContain("@/services/inventory.api")
    expect(source).toContain("@/mappers/inventory.mapper")
    expect(source).toContain("@/data/catalogs/inventory.catalog")
    expect(source).not.toContain("@/data/mocks/inventario.mock")
    expect(source).not.toMatch(/\binventarioMock\b/)
    expect(source).not.toMatch(/\bmovimientosInventarioMock\b/)
    expect(source).not.toMatch(/generateRegistrationNumber/)
    expect(source).not.toMatch(/generateMovementNumber/)
    expect(source).not.toMatch(/Math\.max/)
  })

  it("Dashboard obtiene inventario y ventas desde API", () => {
    const source = fs.readFileSync(
      "src/pages/Dashboard.jsx",
      "utf8"
    )

    expect(source).toContain("@/services/inventory.api")
    expect(source).toContain("@/mappers/inventory.mapper")
    expect(source).toContain("@/services/sales.api")
    expect(source).toContain("@/mappers/sale.mapper")
    expect(source).not.toContain("useMlbtData")
  })

  it("Ventas ya no muta inventario local ni depende de contexto legacy", () => {
    const appSource = fs.readFileSync(
      "src/App.jsx",
      "utf8"
    )
    const salesSource = fs.readFileSync(
      "src/features/ventas/VentasProvider.jsx",
      "utf8"
    )

    expect(salesSource).not.toContain("useMlbtData")
    expect(salesSource).not.toContain("setItemsInventario")
    expect(salesSource).not.toContain("setMovimientosInventario")
    expect(appSource).not.toContain("MlbtDataProvider")
    expect(fs.existsSync("src/context/MlbtDataContext.jsx")).toBe(false)
  })
})