import test from "node:test";
import assert from "node:assert/strict";

import { loginSchema } from "../schemas/auth.schema.js";
import { createInventorySchema } from "../schemas/inventory.schema.js";
import { createSaleSchema } from "../schemas/sale.schema.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

test("loginSchema acepta credenciales validas", () => {
  const result = loginSchema.safeParse({
    body: {
      username: "adminapp",
      password: "AdminApp123*"
    }
  });

  assert.equal(result.success, true);
  assert.equal(result.data.body.username, "adminapp");
});

test("loginSchema rechaza contrasenas cortas", () => {
  const result = loginSchema.safeParse({
    body: {
      username: "adminapp",
      password: "123"
    }
  });

  assert.equal(result.success, false);
});

test("createUserSchema aplica defaults seguros", () => {
  const result = createUserSchema.parse({
    body: {
      nombre: "Usuario de prueba",
      username: "usuario.prueba",
      password: "ClaveSegura123"
    }
  });

  assert.equal(result.body.rol, "MESERO");
  assert.equal(result.body.estado, "ACTIVO");
});

test("updateUserSchema exige id numerico positivo", () => {
  const result = updateUserSchema.safeParse({
    params: { id: "0" },
    body: { nombre: "Usuario actualizado" }
  });

  assert.equal(result.success, false);
});

test("createInventorySchema convierte stock numerico y aplica unidad default", () => {
  const result = createInventorySchema.parse({
    body: {
      nombre: "Tortilla",
      stock: "12"
    }
  });

  assert.equal(result.body.stock, 12);
  assert.equal(result.body.unidad, "unidad");
  assert.equal(result.body.estado, "ACTIVO");
});

test("createSaleSchema rechaza cantidades no positivas", () => {
  const result = createSaleSchema.safeParse({
    body: {
      producto: "Taco al pastor",
      cantidad: 0,
      total: 12000
    }
  });

  assert.equal(result.success, false);
});
