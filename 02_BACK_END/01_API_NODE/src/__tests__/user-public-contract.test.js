import test from "node:test";
import assert from "node:assert/strict";

import { buildPublicUser } from "../services/auth.service.js";

test("buildPublicUser expone contrato funcional y excluye passwordHash", () => {
  const fecha = new Date("2026-08-13T12:00:00.000Z");

  const result = buildPublicUser({
    id: 7,
    numeroRegistro: "USR-000007",
    documento: "1000000001",
    nombres: "Maria",
    apellidos: "Lopez",
    telefono: "3001234567",
    nombre: "Maria Lopez",
    username: "maria.lopez",
    email: "maria@example.test",
    passwordHash: "valor-no-publico",
    rol: "ADMIN_TIENDA",
    estado: "ACTIVO",
    createdAt: fecha,
    updatedAt: fecha
  });

  assert.equal(result.numeroRegistro, "USR-000007");
  assert.equal(result.documento, "1000000001");
  assert.equal(result.nombres, "Maria");
  assert.equal(result.apellidos, "Lopez");
  assert.equal(result.telefono, "3001234567");
  assert.equal(Object.prototype.hasOwnProperty.call(result, "passwordHash"), false);
});
