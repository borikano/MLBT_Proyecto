import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  buildSessionRevocationPatch,
  buildSessionTokenPayload,
  isSessionVersionValid,
  shouldRevokeSessions
} from "../security/session-security.js";

test("JWT payload funcional incluye sessionVersion", () => {
  const payload = buildSessionTokenPayload({
    id: 7,
    username: "cajero1",
    rol: "CAJERO",
    sessionVersion: 4
  });

  assert.deepEqual(payload, {
    id: 7,
    username: "cajero1",
    rol: "CAJERO",
    sessionVersion: 4
  });
});

test("sessionVersion rechaza token historico o desactualizado", () => {
  const usuario = { sessionVersion: 3 };

  assert.equal(isSessionVersionValid({}, usuario), false);
  assert.equal(isSessionVersionValid({ sessionVersion: 2 }, usuario), false);
  assert.equal(isSessionVersionValid({ sessionVersion: 3 }, usuario), true);
});

test("cambio efectivo de rol o estado revoca sesiones", () => {
  const actual = { rol: "MESERO", estado: "ACTIVO" };

  assert.equal(shouldRevokeSessions(actual, { rol: "CAJERO" }), true);
  assert.equal(shouldRevokeSessions(actual, { estado: "INACTIVO" }), true);
  assert.equal(shouldRevokeSessions(actual, { nombre: "Nuevo nombre" }), false);
  assert.equal(shouldRevokeSessions(actual, { rol: "MESERO" }), false);
});

test("patch de revocacion incrementa una sola version", () => {
  const actual = { rol: "MESERO", estado: "ACTIVO" };

  assert.deepEqual(
    buildSessionRevocationPatch(actual, { rol: "CAJERO" }),
    { sessionVersion: { increment: 1 } }
  );
  assert.deepEqual(
    buildSessionRevocationPatch(actual, { nombre: "Cambio no sensible" }),
    {}
  );
});

test("integracion de auth y usuarios consume session-security", () => {
  const authService = readFileSync(
    new URL("../services/auth.service.js", import.meta.url),
    "utf8"
  );
  const authMiddleware = readFileSync(
    new URL("../middlewares/auth.middleware.js", import.meta.url),
    "utf8"
  );
  const userService = readFileSync(
    new URL("../services/user.service.js", import.meta.url),
    "utf8"
  );

  assert.match(authService, /buildSessionTokenPayload\(usuario\)/);
  assert.match(authMiddleware, /isSessionVersionValid\(payload,\s*usuario\)/);
  assert.match(userService, /buildSessionRevocationPatch\(currentUser,\s*data\)/);
  assert.match(
    userService,
    /buildSessionRevocationPatch\(currentUser,\s*\{\s*estado:\s*"RETIRADO"\s*\}\)/
  );
});
