import test from "node:test";
import assert from "node:assert/strict";

import {
  createSaleSchema,
  createSaleProductSchema
} from "../schemas/sale.schema.js";
import {
  buildSaleNumber,
  buildSaleProductCode,
  buildSaleCancelWhere,
  buildLegacyStructuredSale,
  calculateSaleTotal,
  buildConsumption
} from "../services/sale.service.js";
import { isValidPaymentMethod } from "../constants/sale.constants.js";

test("createSaleSchema acepta el contrato estructurado del frontend", () => {
  const result = createSaleSchema.safeParse({
    body: {
      cliente: "Cliente mostrador",
      tipoVenta: "Mesa",
      metodoPagoSegmento: "efectivo",
      metodoPago: "Efectivo",
      items: [
        { productoId: 1, cantidad: 2 },
        { productoId: 4, cantidad: 1 }
      ]
    }
  });

  assert.equal(result.success, true);
});

test("createSaleSchema conserva el contrato simple de v1.0", () => {
  const result = createSaleSchema.safeParse({
    body: {
      producto: "Taco al pastor",
      cantidad: 2,
      total: 24000
    }
  });

  assert.equal(result.success, true);
});

test("createSaleSchema rechaza metodo fuera del segmento seleccionado", () => {
  const result = createSaleSchema.safeParse({
    body: {
      cliente: "Cliente mostrador",
      tipoVenta: "Mesa",
      metodoPagoSegmento: "efectivo",
      metodoPago: "Nequi",
      items: [
        { productoId: 1, cantidad: 1 }
      ]
    }
  });

  assert.equal(result.success, false);
});

test("createSaleProductSchema exige receta persistente", () => {
  const result = createSaleProductSchema.safeParse({
    body: {
      nombre: "Taco de prueba",
      categoria: "Tacos",
      precio: 12000,
      receta: []
    }
  });

  assert.equal(result.success, false);
});

test("identificadores de ventas son estables", () => {
  assert.equal(buildSaleNumber(7), "VTA-000007");
  assert.equal(buildSaleProductCode(3), "VEN-000003");
});

test("calculateSaleTotal usa precio de servidor por cantidad", () => {
  const total = calculateSaleTotal([
    { precioUnitario: 12000, cantidad: 2 },
    { precioUnitario: 5000, cantidad: 1 }
  ]);

  assert.equal(total, 29000);
});

test("buildConsumption agrupa insumos compartidos entre productos", () => {
  const productMap = new Map([
    [
      1,
      {
        receta: [
          { productoInventarioId: 10, cantidad: 1 },
          { productoInventarioId: 11, cantidad: 0.5 }
        ]
      }
    ],
    [
      2,
      {
        receta: [
          { productoInventarioId: 10, cantidad: 2 }
        ]
      }
    ]
  ]);

  const consumo = buildConsumption(
    [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 }
    ],
    productMap
  );

  const insumo10 = consumo.find((item) => item.productoInventarioId === 10);
  const insumo11 = consumo.find((item) => item.productoInventarioId === 11);

  assert.equal(insumo10.cantidad, 4);
  assert.equal(insumo11.cantidad, 1);
});
test("isValidPaymentMethod valida el estado final de segmento y metodo", () => {
  assert.equal(isValidPaymentMethod("efectivo", "Efectivo"), true);
  assert.equal(isValidPaymentMethod("efectivo", "Nequi"), false);
  assert.equal(isValidPaymentMethod("billeteras", "Nequi"), true);
});

test("buildSaleCancelWhere reserva solo ventas confirmadas", () => {
  assert.deepEqual(buildSaleCancelWhere(9), {
    id: 9,
    estado: "CONFIRMADA"
  });
});

test("buildLegacyStructuredSale adapta v1.0 sin confiar en total del cliente", () => {
  const result = buildLegacyStructuredSale(3, {
    producto: "Taco al pastor",
    cantidad: 2,
    total: 1
  });

  assert.deepEqual(result, {
    cliente: "Cliente mostrador",
    tipoVenta: "Mesa",
    metodoPagoSegmento: "efectivo",
    metodoPago: "Efectivo",
    items: [
      {
        productoId: 3,
        cantidad: 2
      }
    ]
  });

  assert.equal(Object.hasOwn(result, "total"), false);
});
