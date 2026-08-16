import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import { apiRequest } from "@/lib/api"
import {
  buildCreateSalePayload,
  mapApiSaleProductToUi,
  mapApiSaleToUi,
} from "@/mappers/sale.mapper"
import {
  cancelSaleApi,
  createSaleApi,
  listSaleProductsApi,
  listSalesApi,
} from "@/services/sales.api"

vi.mock("@/lib/api", () => ({
  apiRequest: vi.fn(),
}))

vi.mock("@/lib/auth", () => ({
  getAuthToken: vi.fn(() => "token-test"),
}))

describe("Ventas API y mapper", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("mapea ProductoVenta y receta al contrato visual", () => {
    expect(
      mapApiSaleProductToUi({
        id: 3,
        codigo: "VEN-000003",
        nombre: "Taco API",
        categoria: "Tacos",
        precio: "12000",
        estado: "ACTIVO",
        receta: [
          {
            productoInventarioId: 8,
            cantidad: "0.5",
            productoInventario: {
              numeroRegistro: "PRD-000008",
              nombre: "Proteína",
              unidad: "kg",
              estado: "ACTIVO",
            },
          },
        ],
      })
    ).toMatchObject({
      id: 3,
      codigo: "VEN-000003",
      precio: 12000,
      estado: "Activo",
      receta: [
        {
          itemId: 8,
          cantidad: 0.5,
          itemRegistrationNumber: "PRD-000008",
          itemName: "Proteína",
          unidad: "kg",
        },
      ],
    })
  })

  it("mapea venta backend a historial visual con detalles numéricos", () => {
    const mapped = mapApiSaleToUi({
      id: 7,
      numeroVenta: "VTA-000007",
      fecha: "2026-08-15T18:30:00",
      tipoVenta: "Mesa",
      metodoPagoSegmento: "efectivo",
      metodoPago: "Efectivo",
      cliente: "Cliente API",
      estado: "CONFIRMADA",
      total: "29000",
      usuario: {
        nombre: "Administrador MLBT",
      },
      detalles: [
        {
          id: 10,
          productoVentaId: 3,
          codigoProducto: "VEN-000003",
          nombreProducto: "Taco API",
          categoria: "Tacos",
          cantidad: 2,
          precioUnitario: "12000",
          subtotal: "24000",
        },
      ],
    })

    expect(mapped.saleNumber).toBe("VTA-000007")
    expect(mapped.estado).toBe("Confirmada")
    expect(mapped.total).toBe(29000)
    expect(mapped.fecha).toBe("2026-08-15")
    expect(mapped.items[0]).toMatchObject({
      productId: 3,
      productCode: "VEN-000003",
      productName: "Taco API",
      quantity: 2,
      unitPrice: 12000,
      subtotal: 24000,
    })
  })

  it("mapea estado ANULADA sin perder detalles", () => {
    const mapped = mapApiSaleToUi({
      id: 9,
      numeroVenta: "VTA-000009",
      estado: "ANULADA",
      total: 1000,
      detalles: [],
    })

    expect(mapped.estado).toBe("Anulada")
    expect(mapped.items).toEqual([])
  })

  it("payload estructurado no envia precio, total ni numeros locales", () => {
    const payload = buildCreateSalePayload({
      saleForm: {
        cliente: " Cliente ",
        tipoVenta: "Mesa",
        metodoPagoSegmento: "efectivo",
        metodoPago: "Efectivo",
      },
      orderItems: [
        {
          productId: 3,
          quantity: 2,
          unitPrice: 12000,
          subtotal: 24000,
          saleNumber: "NO-ENVIAR",
        },
      ],
    })

    expect(payload).toEqual({
      cliente: "Cliente",
      tipoVenta: "Mesa",
      metodoPagoSegmento: "efectivo",
      metodoPago: "Efectivo",
      items: [
        {
          productoId: 3,
          cantidad: 2,
        },
      ],
    })
    expect(payload).not.toHaveProperty("total")
  })

  it("listSalesApi usa GET autenticado", async () => {
    apiRequest.mockResolvedValueOnce({
      ok: true,
      data: [],
    })

    await expect(listSalesApi()).resolves.toEqual([])

    expect(apiRequest).toHaveBeenCalledWith("/api/sales", {
      method: "GET",
      token: "token-test",
      signal: undefined,
    })
  })

  it("listSaleProductsApi usa catalogo real", async () => {
    apiRequest.mockResolvedValueOnce({
      ok: true,
      data: [],
    })

    await expect(listSaleProductsApi()).resolves.toEqual([])

    expect(apiRequest).toHaveBeenCalledWith("/api/sales/products", {
      method: "GET",
      token: "token-test",
      signal: undefined,
    })
  })

  it("createSaleApi envia solo el body recibido", async () => {
    apiRequest.mockResolvedValueOnce({
      ok: true,
      data: {
        id: 1,
      },
    })

    const body = {
      cliente: "Cliente",
      tipoVenta: "Mesa",
      metodoPagoSegmento: "efectivo",
      metodoPago: "Efectivo",
      items: [
        {
          productoId: 3,
          cantidad: 1,
        },
      ],
    }

    await createSaleApi(body)

    expect(apiRequest).toHaveBeenCalledWith("/api/sales", {
      method: "POST",
      token: "token-test",
      body,
    })
  })

  it("cancelSaleApi usa DELETE con motivo auditado", async () => {
    apiRequest.mockResolvedValueOnce({
      ok: true,
      data: {
        id: 5,
        estado: "ANULADA",
      },
    })

    await cancelSaleApi(5, " Error de registro ")

    expect(apiRequest).toHaveBeenCalledWith("/api/sales/5", {
      method: "DELETE",
      token: "token-test",
      body: {
        motivo: "Error de registro",
      },
    })
  })
})