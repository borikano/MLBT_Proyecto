import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { AUDIT_RESULTS } from "../constants/audit.constants.js";
import { requestContext } from "../middlewares/request-context.middleware.js";
import {
  buildAuditData,
  sanitizeAuditMetadata
} from "../services/audit.service.js";

test("requestContext genera requestId y lo expone en la respuesta", () => {
  const req = {};
  const headers = {};
  const res = {
    setHeader(name, value) {
      headers[name] = value;
    }
  };
  let nextCalled = false;

  requestContext(req, res, () => {
    nextCalled = true;
  });

  assert.match(
    req.requestId,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  assert.equal(headers["X-Request-Id"], req.requestId);
  assert.equal(nextCalled, true);
});

test("sanitizeAuditMetadata usa whitelist y excluye secretos", () => {
  const metadata = sanitizeAuditMetadata(
    {
      anterior: "MESERO",
      nuevo: "CAJERO",
      token: "no-debe-salir",
      passwordHash: "no-debe-salir"
    },
    ["anterior", "nuevo", "token", "passwordHash"]
  );

  assert.deepEqual(metadata, {
    anterior: "MESERO",
    nuevo: "CAJERO"
  });
});

test("buildAuditData normaliza entidadId y resultado", () => {
  const data = buildAuditData({
    usuarioId: 7,
    role: "ADMIN_APP",
    modulo: "users",
    accion: "users.role_changed",
    resultado: AUDIT_RESULTS.SUCCESS,
    entidad: "Usuario",
    entidadId: 25,
    requestId: "req-controlado"
  });

  assert.equal(data.entidadId, "25");
  assert.equal(data.resultado, "SUCCESS");
  assert.equal(data.requestId, "req-controlado");
});

test("schema contiene sessionVersion y AuditEvent", () => {
  const schemaUrl = new URL("../../prisma/schema.prisma", import.meta.url);
  const schema = readFileSync(schemaUrl, "utf8");

  assert.match(schema, /\bsessionVersion\s+Int\s+@default\(1\)/);
  assert.match(schema, /\bmodel\s+AuditEvent\s*\{/);
  assert.match(schema, /\brequestId\s+String\?/);
  assert.match(schema, /@@index\(\[requestId\]\)/);
});

test("app registra requestContext antes de las rutas API", () => {
  const appUrl = new URL("../app.js", import.meta.url);
  const app = readFileSync(appUrl, "utf8");

  const middlewareIndex = app.indexOf("app.use(requestContext)");
  const routesIndex = app.indexOf('app.use("/api/health"');

  assert.ok(middlewareIndex >= 0);
  assert.ok(routesIndex > middlewareIndex);
});
