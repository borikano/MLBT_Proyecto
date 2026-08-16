import test from "node:test";
import assert from "node:assert/strict";

import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

test("createUserSchema acepta contrato estructurado de usuarios", () => {
  const result = createUserSchema.parse({
    body: {
      nombres: "Maria",
      apellidos: "Lopez",
      documento: "1000000001",
      telefono: "3001234567",
      username: "maria.lopez",
      email: "maria@example.test",
      password: "ClaveSegura123"
    }
  });

  assert.equal(result.body.rol, "MESERO");
  assert.equal(result.body.estado, "ACTIVO");
  assert.equal(result.body.documento, "1000000001");
});

test("createUserSchema conserva compatibilidad con nombre de v1.0", () => {
  const result = createUserSchema.safeParse({
    body: {
      nombre: "Usuario legado",
      username: "usuario.legado",
      password: "ClaveSegura123"
    }
  });

  assert.equal(result.success, true);
});

test("createUserSchema exige una representacion de nombre", () => {
  const result = createUserSchema.safeParse({
    body: {
      username: "sin.nombre",
      password: "ClaveSegura123"
    }
  });

  assert.equal(result.success, false);
});

test("updateUserSchema acepta estados operativos ampliados", () => {
  const result = updateUserSchema.safeParse({
    params: { id: "7" },
    body: {
      estado: "PENDIENTE_BAJA"
    }
  });

  assert.equal(result.success, true);
  assert.equal(result.data.params.id, 7);
});
