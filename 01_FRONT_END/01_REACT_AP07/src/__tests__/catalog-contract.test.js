import fs from "node:fs"

import { describe, expect, it } from "vitest"

import {
  estadosUsuario,
  rolesUsuarios,
} from "@/data/catalogs/users.catalog"

import {
  categoriasInventario,
  estadosInventario,
  tiposMovimientoInventario,
  unidadesInventario,
} from "@/data/catalogs/inventory.catalog"

import {
  segmentosMetodoPagoVenta,
  tiposVenta,
} from "@/data/catalogs/sales.catalog"

import {
  categoriasInventario as categoriasInventarioMock,
  estadosInventario as estadosInventarioMock,
  tiposMovimientoInventario as tiposMovimientoInventarioMock,
  unidadesInventario as unidadesInventarioMock,
} from "@/data/mocks/inventario.mock"

import {
  segmentosMetodoPagoVenta as segmentosMetodoPagoVentaMock,
  tiposVenta as tiposVentaMock,
} from "@/data/mocks/ventas.mock"

describe("catalogos estaticos separados de fixtures", () => {
  it("catalogos de usuarios cubren roles y estados del contrato API", () => {
    expect(rolesUsuarios.map((role) => role.value)).toEqual([
      "ADMIN_APP",
      "ADMIN_TIENDA",
      "MESERO",
      "COCINA",
      "BODEGA",
      "CAJERO",
      "LECTURA",
    ])

    expect(estadosUsuario).toEqual([
      "Activo",
      "Pendiente de aprobación",
      "Pendiente de baja",
      "Retirado",
      "Inactivo",
    ])
  })

  it("catalogos de inventario conservan exactamente el contrato anterior", () => {
    expect(categoriasInventario).toEqual(categoriasInventarioMock)
    expect(unidadesInventario).toEqual(unidadesInventarioMock)
    expect(estadosInventario).toEqual(estadosInventarioMock)
    expect(tiposMovimientoInventario).toEqual(tiposMovimientoInventarioMock)
  })

  it("catalogos de ventas conservan exactamente el contrato anterior", () => {
    expect(segmentosMetodoPagoVenta).toEqual(segmentosMetodoPagoVentaMock)
    expect(tiposVenta).toEqual(tiposVentaMock)
  })

  it("consumidores runtime principales usan data/catalogs", () => {
    const files = [
      "src/features/usuarios/UsuariosProvider.jsx",
      "src/features/inventario/inventarioLogic.js",
      "src/features/inventario/InventarioProvider.jsx",
      "src/features/ventas/ventasLogic.js",
      "src/features/ventas/VentasProvider.jsx",
    ]

    const source = files.map((file) => fs.readFileSync(file, "utf8")).join("\n")

    expect(source).toContain("@/data/catalogs/users.catalog")
    expect(source).toContain("@/data/catalogs/inventory.catalog")
    expect(source).toContain("@/data/catalogs/sales.catalog")
  })
})
