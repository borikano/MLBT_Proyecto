import test from "node:test";
import assert from "node:assert/strict";

import {
  createInventorySchema,
  createInventoryMovementSchema
} from "../schemas/inventory.schema.js";
import {
  buildInventoryRegistrationNumber,
  buildMovementNumber,
  calculateNextStock
} from "../services/inventory.service.js";

test("createInventorySchema normaliza el contrato requerido por frontend", () => {
  const result = createInventorySchema.parse({
    body: {
      nombre: "Carne al pastor",
      categoria: "Proteinas",
      unidad: "kg",
      stock: "22",
      stockMin: "6"
    }
  });

  assert.equal(result.body.stock, 22);
  assert.equal(result.body.stockMin, 6);
  assert.equal(result.body.estado, "ACTIVO");
});

test("createInventoryMovementSchema permite ajuste negativo distinto de cero", () => {
  const result = createInventoryMovementSchema.safeParse({
    body: {
      productoId: 14,
      tipo: "AJUSTE",
      cantidad: -1.5,
      motivo: "Merma controlada"
    }
  });

  assert.equal(result.success, true);
});

test("createInventoryMovementSchema rechaza salida no positiva", () => {
  const result = createInventoryMovementSchema.safeParse({
    body: {
      productoId: 14,
      tipo: "SALIDA",
      cantidad: 0,
      motivo: "Salida invalida"
    }
  });

  assert.equal(result.success, false);
});

test("identificadores de inventario son estables y no dependen de estado", () => {
  assert.equal(buildInventoryRegistrationNumber(7), "PRD-000007");
  assert.equal(buildMovementNumber(12), "MOV-000012");
});

test("calculateNextStock respeta entrada salida y ajuste", () => {
  assert.equal(calculateNextStock(10, "ENTRADA", 2), 12);
  assert.equal(calculateNextStock(10, "SALIDA", 2), 8);
  assert.equal(calculateNextStock(10, "AJUSTE", -1.5), 8.5);
});
test("createInventorySchema conserva compatibilidad cuando categoria no viene informada", () => {
  const result = createInventorySchema.parse({
    body: {
      nombre: "Tortilla",
      stock: "12"
    }
  });

  assert.equal(result.body.categoria, "General");
  assert.equal(result.body.stock, 12);
});
