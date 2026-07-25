import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

process.env.NODE_ENV = "test";

const { app } = await import("../app.js");

test("GET / responde metadatos publicos de la API", async () => {
  const response = await request(app).get("/").expect(200);

  assert.equal(response.body.ok, true);
  assert.equal(response.body.message, "API MLBT disponible");
  assert.equal(response.body.endpoints.health, "/api/health");
});

test("GET /api/health responde estado publico de servicio", async () => {
  const response = await request(app).get("/api/health").expect(200);

  assert.equal(response.body.ok, true);
  assert.equal(response.body.service, "api-mlbt");
  assert.equal(response.body.status, "running");
  assert.match(response.body.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});

test("POST /api/auth/login rechaza payload invalido", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ username: "ad", password: "123" })
    .expect(400);

  assert.equal(response.body.ok, false);
  assert.equal(response.body.message, "Datos de entrada invalidos");
});

test("GET /api/auth/profile exige token bearer", async () => {
  const response = await request(app).get("/api/auth/profile").expect(401);

  assert.equal(response.body.ok, false);
  assert.equal(response.body.message, "Token de autenticacion requerido");
});

test("GET /api/auth/profile rechaza token invalido", async () => {
  const response = await request(app)
    .get("/api/auth/profile")
    .set("Authorization", "Bearer token-invalido")
    .expect(401);

  assert.equal(response.body.ok, false);
  assert.equal(response.body.message, "Token invalido o expirado");
});

test("GET /api/users protege el modulo de usuarios", async () => {
  const response = await request(app).get("/api/users").expect(401);

  assert.equal(response.body.ok, false);
  assert.equal(response.body.message, "Token de autenticacion requerido");
});

test("GET de ruta inexistente responde 404 consistente", async () => {
  const response = await request(app).get("/api/no-existe").expect(404);

  assert.equal(response.body.ok, false);
  assert.equal(response.body.message, "Ruta no encontrada");
  assert.equal(response.body.path, "/api/no-existe");
});
