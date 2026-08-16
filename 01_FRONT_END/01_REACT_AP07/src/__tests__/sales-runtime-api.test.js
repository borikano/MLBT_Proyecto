import fs from "node:fs"

import {
  describe,
  expect,
  it,
} from "vitest"

describe("Ventas runtime API", () => {
  it("VentasProvider usa API real sin fixtures ni mutaciones locales de inventario", () => {
    const source = fs.readFileSync(
      "src/features/ventas/VentasProvider.jsx",
      "utf8"
    )

    expect(source).toContain("@/services/sales.api")
    expect(source).toContain("@/mappers/sale.mapper")
    expect(source).toContain("@/data/catalogs/sales.catalog")
    expect(source).not.toContain("@/data/mocks/ventas.mock")
    expect(source).not.toContain("useMlbtData")
    expect(source).not.toContain("setItemsInventario")
    expect(source).not.toContain("setMovimientosInventario")
    expect(source).not.toMatch(/generateSaleNumber/)
    expect(source).not.toMatch(/generateMovementNumber/)
    expect(source).not.toMatch(/Math\.max/)
  })

  it("confirmacion usa POST API y el mapper omite autoridad local", () => {
    const provider = fs.readFileSync(
      "src/features/ventas/VentasProvider.jsx",
      "utf8"
    )
    const mapper = fs.readFileSync(
      "src/mappers/sale.mapper.js",
      "utf8"
    )

    expect(provider).toContain("createSaleApi(")
    expect(provider).toContain("buildCreateSalePayload")
    expect(mapper).toContain("productoId")
    expect(mapper).toContain("cantidad")
    expect(mapper).not.toContain("numeroVenta:")
  })

  it("anulacion usa SALES_CANCEL, motivo y DELETE API", () => {
    const provider = fs.readFileSync(
      "src/features/ventas/VentasProvider.jsx",
      "utf8"
    )
    const history = fs.readFileSync(
      "src/pages/ventas/VentasHistorialPage.jsx",
      "utf8"
    )
    const api = fs.readFileSync(
      "src/services/sales.api.js",
      "utf8"
    )

    expect(provider).toContain("PERMISSIONS.SALES_CANCEL")
    expect(provider).toContain("cancelSaleApi")
    expect(history).toContain("motivoAnulacion")
    expect(history).toContain("Confirmar anulación")
    expect(api).toContain('method: "DELETE"')
    expect(api).toContain("motivo:")
  })

  it("Dashboard obtiene ventas desde API y contexto legacy fue retirado", () => {
    const dashboard = fs.readFileSync(
      "src/pages/Dashboard.jsx",
      "utf8"
    )
    const app = fs.readFileSync(
      "src/App.jsx",
      "utf8"
    )

    expect(dashboard).toContain("@/services/sales.api")
    expect(dashboard).toContain("@/mappers/sale.mapper")
    expect(dashboard).not.toContain("useMlbtData")
    expect(app).not.toContain("MlbtDataProvider")
    expect(fs.existsSync("src/context/MlbtDataContext.jsx")).toBe(false)
  })
})