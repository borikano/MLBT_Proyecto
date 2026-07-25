import { describe, expect, it } from "vitest"

import {
  buildConsumptionFromOrder,
  buildDemandSummary,
  buildPaymentSummary,
  buildSegmentSummary,
  generateMovementNumber,
  generateSaleNumber,
  validateStockForOrder,
  validateStockForProduct,
} from "@/features/ventas/ventasLogic"

const sales = [
  {
    saleNumber: "VTA-0003",
    fechaHora: "2026-06-18T09:20:00",
    fecha: "2026-06-18",
    hora: "09:00",
    metodoPagoSegmento: "efectivo",
    total: 46000,
    items: [
      { productId: 1, productName: "Taco al pastor", quantity: 3, subtotal: 36000 },
      { productId: 4, productName: "Gaseosa personal", quantity: 2, subtotal: 10000 },
    ],
  },
  {
    saleNumber: "VTA-0007",
    fechaHora: "2026-06-17T11:10:00",
    fecha: "2026-06-17",
    hora: "11:00",
    metodoPagoSegmento: "billeteras",
    total: 44000,
    items: [
      { productId: 1, productName: "Taco al pastor", quantity: 2, subtotal: 24000 },
      { productId: 5, productName: "Agua fresca", quantity: 2, subtotal: 12000 },
    ],
  },
]

const products = [
  {
    id: 1,
    nombre: "Taco al pastor",
    receta: [
      { itemId: 10, cantidad: 1 },
      { itemId: 11, cantidad: 0.5 },
    ],
  },
  {
    id: 2,
    nombre: "Quesadilla mixta",
    receta: [
      { itemId: 10, cantidad: 2 },
      { itemId: 12, cantidad: 1 },
    ],
  },
]

const inventoryItems = [
  { id: 10, nombre: "Tortilla", stock: 10, unidad: "unidad", estado: "Activo" },
  { id: 11, nombre: "Pastor", stock: 4, unidad: "kg", estado: "Activo" },
  { id: 12, nombre: "Queso", stock: 2, unidad: "kg", estado: "Activo" },
]

describe("ventasLogic", () => {
  it("genera consecutivos de venta y movimiento desde la secuencia mayor", () => {
    expect(generateSaleNumber(sales)).toBe("VTA-0008")
    expect(generateMovementNumber([{ movementNumber: "MOV-0010" }], 2)).toBe("MOV-0012")
  })

  it("agrupa ventas por dia y ordena primero el periodo mas reciente", () => {
    expect(buildSegmentSummary(sales, "dia")).toEqual([
      {
        key: "2026-06-18",
        label: "Día 2026-06-18",
        ventas: 1,
        total: 46000,
        productos: 5,
      },
      {
        key: "2026-06-17",
        label: "Día 2026-06-17",
        ventas: 1,
        total: 44000,
        productos: 4,
      },
    ])
  })

  it("consolida demanda de productos por cantidad vendida", () => {
    expect(buildDemandSummary(sales)).toEqual([
      { productId: 1, productName: "Taco al pastor", quantity: 5, total: 60000 },
      { productId: 4, productName: "Gaseosa personal", quantity: 2, total: 10000 },
      { productId: 5, productName: "Agua fresca", quantity: 2, total: 12000 },
    ])
  })

  it("consolida pagos por segmento", () => {
    expect(buildPaymentSummary(sales)).toMatchObject([
      { key: "efectivo", ventas: 1, total: 46000 },
      { key: "billeteras", ventas: 1, total: 44000 },
    ])
  })

  it("calcula consumo de inventario requerido por el pedido", () => {
    expect(
      buildConsumptionFromOrder(
        [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
        products
      )
    ).toEqual([
      { itemId: 10, cantidad: 4 },
      { itemId: 11, cantidad: 1 },
      { itemId: 12, cantidad: 1 },
    ])
  })

  it("valida stock considerando reservas previas del pedido actual", () => {
    const message = validateStockForProduct({
      product: products[1],
      requestedQuantity: 3,
      currentOrder: [{ productId: 1, quantity: 6 }],
      products,
      inventoryItems,
    })

    expect(message).toContain("Stock insuficiente")
    expect(message).toContain("Tortilla")
  })

  it("acepta pedidos cuando el consumo total tiene stock disponible", () => {
    expect(
      validateStockForOrder({
        orderItems: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
        products,
        inventoryItems,
      })
    ).toBe("")
  })
})
