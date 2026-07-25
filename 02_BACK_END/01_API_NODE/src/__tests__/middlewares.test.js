import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

import { errorHandler } from "../middlewares/error.middleware.js";
import { notFoundHandler } from "../middlewares/not-found.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createHttpError } from "../utils/http-error.js";

function createResponse() {
  return {
    statusCode: 200,
    payload: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    }
  };
}

test("validate guarda datos normalizados y llama next con entrada valida", () => {
  const schema = z.object({
    body: z.object({ cantidad: z.coerce.number().int().positive() }),
    params: z.object({}).optional(),
    query: z.object({}).optional()
  });
  const req = { body: { cantidad: "3" }, params: {}, query: {} };
  const res = createResponse();
  let nextCalled = false;

  validate(schema)(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.validated.body.cantidad, 3);
});

test("validate responde 400 y no llama next con entrada invalida", () => {
  const schema = z.object({
    body: z.object({ cantidad: z.coerce.number().int().positive() }),
    params: z.object({}).optional(),
    query: z.object({}).optional()
  });
  const req = { body: { cantidad: "0" }, params: {}, query: {} };
  const res = createResponse();
  let nextCalled = false;

  validate(schema)(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 400);
  assert.equal(res.payload.ok, false);
  assert.equal(res.payload.message, "Datos de entrada invalidos");
});

test("notFoundHandler responde una estructura consistente", () => {
  const req = { originalUrl: "/ruta-inexistente" };
  const res = createResponse();

  notFoundHandler(req, res);

  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.payload, {
    ok: false,
    message: "Ruta no encontrada",
    path: "/ruta-inexistente"
  });
});

test("errorHandler respeta statusCode de errores HTTP", () => {
  const res = createResponse();
  const error = createHttpError(401, "No autorizado");

  errorHandler(error, {}, res, () => {});

  assert.equal(res.statusCode, 401);
  assert.equal(res.payload.ok, false);
  assert.equal(res.payload.message, "No autorizado");
});
