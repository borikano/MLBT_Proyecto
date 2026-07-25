import test from "node:test";
import assert from "node:assert/strict";

import { buildConfig } from "../config/env.js";
import { buildCorsOrigin } from "../app.js";

test("buildConfig permite defaults controlados en desarrollo", () => {
  const config = buildConfig({});

  assert.equal(config.env, "development");
  assert.equal(config.port, 3001);
  assert.equal(config.jwtSecret, "cambiar_este_valor_en_desarrollo_local");
  assert.equal(config.frontendOrigin, "");
});

test("buildConfig exige secretos y origen explicito en produccion", () => {
  assert.throws(
    () => buildConfig({ NODE_ENV: "production" }),
    /DATABASE_URL, JWT_SECRET, FRONTEND_ORIGIN/
  );
});

test("buildConfig rechaza CORS abierto en produccion", () => {
  assert.throws(
    () =>
      buildConfig({
        NODE_ENV: "production",
        DATABASE_URL: "mysql://user:pass@localhost:3306/mlbt",
        JWT_SECRET: "secreto-controlado-para-pruebas",
        FRONTEND_ORIGIN: "*"
      }),
    /FRONTEND_ORIGIN/
  );
});

test("buildConfig acepta configuracion productiva completa", () => {
  const config = buildConfig({
    NODE_ENV: "production",
    PORT: "8080",
    DATABASE_URL: "mysql://user:pass@localhost:3306/mlbt",
    JWT_SECRET: "secreto-controlado-para-pruebas",
    FRONTEND_ORIGIN: "https://mlbt-proyecto.vercel.app",
    JWT_EXPIRES_IN: "1h",
    BCRYPT_SALT_ROUNDS: "12"
  });

  assert.equal(config.env, "production");
  assert.equal(config.port, 8080);
  assert.equal(config.jwtExpiresIn, "1h");
  assert.equal(config.bcryptSaltRounds, 12);
});

test("buildCorsOrigin permite origen abierto solo fuera de produccion", () => {
  assert.equal(buildCorsOrigin({ env: "development", frontendOrigin: "" }), true);
  assert.deepEqual(buildCorsOrigin({ env: "production", frontendOrigin: "" }), []);
});

test("buildCorsOrigin normaliza multiples origenes explicitos", () => {
  assert.deepEqual(
    buildCorsOrigin({
      env: "production",
      frontendOrigin: "https://mlbt-proyecto.vercel.app, http://localhost:5173"
    }),
    ["https://mlbt-proyecto.vercel.app", "http://localhost:5173"]
  );
});
