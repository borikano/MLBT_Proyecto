import crypto from "node:crypto";
import request from "supertest";

import { app } from "../src/app.js";
import { prisma } from "../src/config/prisma.js";

const adminUsername = process.env.MLBT_E2E_ADMIN_USER;
const adminPassword = process.env.MLBT_E2E_ADMIN_PASSWORD;

if (!adminUsername || !adminPassword) {
  throw new Error("Credencial ADMIN_APP E2E ausente");
}

const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 12);

function pass(message) {
  console.log(`PASS E2E - ${message}`);
}

function ensure(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function expectStatus(response, status, label) {
  ensure(
    response.status === status,
    `${label}: status ${response.status}, esperado ${status}`
  );
}

function dataOf(response) {
  return response.body?.data ?? response.body;
}

async function login(username, password, label) {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ username, password });

  expectStatus(response, 200, label);

  const token = response.body?.token ?? response.body?.data?.token;
  ensure(typeof token === "string" && token.length > 20, `${label}: token ausente`);

  return token;
}

function auth(token) {
  return { Authorization: `Bearer ${token}` };
}

async function createRoleUser(adminToken, role, prefix = role.toLowerCase()) {
  const password = `E2e!${suffix}${role.slice(0, 2)}9aA`;
  const username = `e2e_${prefix}_${suffix}`.slice(0, 58);
  const email = `${username}@example.test`;

  const response = await request(app)
    .post("/api/users")
    .set(auth(adminToken))
    .send({
      nombres: "E2E",
      apellidos: `Temporal ${role}`,
      username,
      email,
      password,
      rol: role,
      estado: "ACTIVO",
    });

  expectStatus(response, 201, `crear usuario ${role}`);

  const user = dataOf(response);
  ensure(Number.isInteger(Number(user.id)), `crear usuario ${role}: id ausente`);

  return {
    id: Number(user.id),
    username,
    password,
    role,
  };
}

let generatedPasswords = [];

try {
  const adminToken = await login(
    adminUsername,
    adminPassword,
    "login ADMIN_APP"
  );
  pass("login ADMIN_APP valido");

  const profile = await request(app)
    .get("/api/auth/profile")
    .set(auth(adminToken));
  expectStatus(profile, 200, "profile ADMIN_APP");
  pass("profile autenticado");

  const invalidLogin = await request(app)
    .post("/api/auth/login")
    .send({
      username: adminUsername,
      password: `incorrecta-${suffix}`,
    });
  expectStatus(invalidLogin, 401, "login invalido");
  pass("login invalido responde 401");

  const invalidToken = await request(app)
    .get("/api/auth/profile")
    .set(auth("jwt-invalido-e2e"));
  expectStatus(invalidToken, 401, "token invalido");
  pass("token invalido responde 401");

  const adminTienda = await createRoleUser(adminToken, "ADMIN_TIENDA", "admintienda");
  const mesero = await createRoleUser(adminToken, "MESERO", "mesero");
  const cocina = await createRoleUser(adminToken, "COCINA", "cocina");
  const bodega = await createRoleUser(adminToken, "BODEGA", "bodega");
  const cajero = await createRoleUser(adminToken, "CAJERO", "cajero");
  const lectura = await createRoleUser(adminToken, "LECTURA", "lectura");
  const sessionUser = await createRoleUser(adminToken, "MESERO", "session");

  generatedPasswords = [
    adminTienda.password,
    mesero.password,
    cocina.password,
    bodega.password,
    cajero.password,
    lectura.password,
    sessionUser.password,
  ];

  pass("fixtures de roles creados en DB temporal");

  const tokens = {
    adminTienda: await login(adminTienda.username, adminTienda.password, "login ADMIN_TIENDA"),
    mesero: await login(mesero.username, mesero.password, "login MESERO"),
    cocina: await login(cocina.username, cocina.password, "login COCINA"),
    bodega: await login(bodega.username, bodega.password, "login BODEGA"),
    cajero: await login(cajero.username, cajero.password, "login CAJERO"),
    lectura: await login(lectura.username, lectura.password, "login LECTURA"),
  };

  pass("login de roles E2E");

  const usersList = await request(app)
    .get("/api/users")
    .set(auth(adminToken));
  expectStatus(usersList, 200, "ADMIN_APP lista usuarios");
  ensure(Array.isArray(dataOf(usersList)), "lista usuarios no es array");
  pass("usuarios listar");

  const lecturaUsers = await request(app)
    .get("/api/users")
    .set(auth(tokens.lectura));
  expectStatus(lecturaUsers, 403, "LECTURA users");
  pass("LECTURA recibe 403 en usuarios");

  const lecturaInventory = await request(app)
    .get("/api/inventory")
    .set(auth(tokens.lectura));
  expectStatus(lecturaInventory, 200, "LECTURA inventory");

  const lecturaSales = await request(app)
    .get("/api/sales")
    .set(auth(tokens.lectura));
  expectStatus(lecturaSales, 200, "LECTURA sales");
  pass("LECTURA conserva accesos de lectura permitidos");

  const bodegaSales = await request(app)
    .get("/api/sales")
    .set(auth(tokens.bodega));
  expectStatus(bodegaSales, 403, "BODEGA sales");
  pass("BODEGA recibe 403 en ventas");

  const cocinaProducts = await request(app)
    .get("/api/sales/products")
    .set(auth(tokens.cocina));
  expectStatus(cocinaProducts, 200, "COCINA products");

  const cocinaSales = await request(app)
    .get("/api/sales")
    .set(auth(tokens.cocina));
  expectStatus(cocinaSales, 403, "COCINA sales");
  pass("COCINA solo consulta catalogo de venta");

  const inventoryCreate = await request(app)
    .post("/api/inventory")
    .set(auth(tokens.bodega))
    .send({
      nombre: `Insumo E2E ${suffix}`,
      categoria: "E2E",
      unidad: "unidad",
      stock: 50,
      stockMin: 5,
    });

  expectStatus(inventoryCreate, 201, "BODEGA crea inventario");

  const inventory = dataOf(inventoryCreate);
  const inventoryId = Number(inventory.id);
  ensure(Number.isInteger(inventoryId), "inventario E2E sin id");
  ensure(Number(inventory.stock) === 50, "stock inicial no autoritativo");
  pass("inventario crear");

  const inventoryUpdate = await request(app)
    .put(`/api/inventory/${inventoryId}`)
    .set(auth(tokens.bodega))
    .send({ stockMin: 6 });

  expectStatus(inventoryUpdate, 200, "BODEGA actualiza inventario");
  ensure(Number(dataOf(inventoryUpdate).stockMin) === 6, "stockMin no actualizado");
  pass("inventario actualizar");

  const movement = await request(app)
    .post("/api/inventory/movements")
    .set(auth(tokens.bodega))
    .send({
      productoId: inventoryId,
      tipo: "ENTRADA",
      cantidad: 5,
      motivo: "E2E entrada controlada",
    });

  expectStatus(movement, 201, "BODEGA movimiento");
  ensure(Number(dataOf(movement).stockNuevo) === 55, "stockNuevo esperado 55");
  pass("movimiento inventario y stockNuevo backend");

  const saleProductCreate = await request(app)
    .post("/api/sales/products")
    .set(auth(adminToken))
    .send({
      nombre: `Producto venta E2E ${suffix}`,
      categoria: "E2E",
      precio: 12000,
      estado: "ACTIVO",
      receta: [
        {
          productoInventarioId: inventoryId,
          cantidad: 2,
        },
      ],
    });

  expectStatus(saleProductCreate, 201, "crear producto venta");
  const saleProduct = dataOf(saleProductCreate);
  const saleProductId = Number(saleProduct.id);
  ensure(Number.isInteger(saleProductId), "producto venta E2E sin id");
  pass("catalogo venta con receta persistente");

  const saleCreate = await request(app)
    .post("/api/sales")
    .set(auth(tokens.mesero))
    .send({
      cliente: "Cliente E2E",
      tipoVenta: "Mesa",
      metodoPagoSegmento: "efectivo",
      metodoPago: "Efectivo",
      items: [
        {
          productoId: saleProductId,
          cantidad: 2,
        },
      ],
    });

  expectStatus(saleCreate, 201, "MESERO crea venta");
  const sale = dataOf(saleCreate);
  const saleId = Number(sale.id);
  ensure(Number.isInteger(saleId), "venta E2E sin id");
  ensure(sale.estado === "CONFIRMADA", "venta no quedo CONFIRMADA");
  ensure(Number(sale.total) === 24000, "total backend esperado 24000");
  ensure(
    typeof sale.numeroVenta === "string" && sale.numeroVenta.startsWith("VTA-"),
    "numeroVenta backend ausente"
  );
  pass("venta estructurada y total autoritativo backend");

  const inventoryAfterSale = await request(app)
    .get(`/api/inventory/${inventoryId}`)
    .set(auth(tokens.bodega));
  expectStatus(inventoryAfterSale, 200, "stock post venta");
  ensure(Number(dataOf(inventoryAfterSale).stock) === 51, "stock post venta esperado 51");
  pass("venta descuenta stock desde receta");

  const cajeroUpdate = await request(app)
    .put(`/api/sales/${saleId}`)
    .set(auth(tokens.cajero))
    .send({ cliente: "Cliente E2E actualizado" });
  expectStatus(cajeroUpdate, 200, "CAJERO actualiza venta");
  pass("CAJERO SALES_UPDATE permitido");

  const meseroCancel = await request(app)
    .delete(`/api/sales/${saleId}`)
    .set(auth(tokens.mesero))
    .send({ motivo: "E2E cancelacion denegada mesero" });
  expectStatus(meseroCancel, 403, "MESERO cancela venta");
  pass("MESERO SALES_CANCEL denegado");

  const cajeroCancel = await request(app)
    .delete(`/api/sales/${saleId}`)
    .set(auth(tokens.cajero))
    .send({ motivo: "E2E cancelacion denegada cajero" });
  expectStatus(cajeroCancel, 403, "CAJERO cancela venta");
  pass("CAJERO SALES_CANCEL denegado");

  const cancel = await request(app)
    .delete(`/api/sales/${saleId}`)
    .set(auth(tokens.adminTienda))
    .send({ motivo: "E2E anulacion controlada" });

  expectStatus(cancel, 200, "ADMIN_TIENDA cancela venta");
  ensure(dataOf(cancel).estado === "ANULADA", "venta no quedo ANULADA");
  pass("ADMIN_TIENDA SALES_CANCEL permitido");

  const inventoryAfterCancel = await request(app)
    .get(`/api/inventory/${inventoryId}`)
    .set(auth(tokens.bodega));
  expectStatus(inventoryAfterCancel, 200, "stock post anulacion");
  ensure(
    Number(dataOf(inventoryAfterCancel).stock) === 55,
    "stock no fue restaurado por anulacion"
  );
  pass("anulacion restaura stock");

  const movementList = await request(app)
    .get(`/api/inventory/movements?productoId=${inventoryId}`)
    .set(auth(tokens.bodega));
  expectStatus(movementList, 200, "movimientos de venta/anulacion");

  const movements = dataOf(movementList);
  ensure(Array.isArray(movements), "movimientos no es array");

  const saleMovements = movements.filter(
    (item) => Number(item.ventaId) === saleId
  );

  ensure(
    saleMovements.some((item) => item.tipo === "SALIDA"),
    "no existe SALIDA vinculada a venta"
  );
  ensure(
    saleMovements.some((item) => item.tipo === "ENTRADA"),
    "no existe ENTRADA de anulacion vinculada a venta"
  );
  pass("movimientos SALIDA/ENTRADA vinculados a venta");

  const sessionTokenBeforeRoleChange = await login(
    sessionUser.username,
    sessionUser.password,
    "login usuario sessionVersion"
  );

  const roleChange = await request(app)
    .put(`/api/users/${sessionUser.id}`)
    .set(auth(adminToken))
    .send({
      rol: "CAJERO",
      motivo: "E2E cambio controlado de rol",
    });

  expectStatus(roleChange, 200, "cambio rol sessionVersion");

  const staleAfterRoleChange = await request(app)
    .get("/api/auth/profile")
    .set(auth(sessionTokenBeforeRoleChange));
  expectStatus(staleAfterRoleChange, 401, "token historico tras cambio rol");
  pass("sessionVersion revoca token tras cambio de rol");

  const sessionTokenAfterRoleChange = await login(
    sessionUser.username,
    sessionUser.password,
    "relogin usuario sessionVersion"
  );

  const deactivate = await request(app)
    .delete(`/api/users/${sessionUser.id}`)
    .set(auth(adminToken))
    .send({ motivo: "E2E retiro controlado" });

  expectStatus(deactivate, 200, "desactivar usuario");
  ensure(dataOf(deactivate).estado === "RETIRADO", "usuario no quedo RETIRADO");

  const staleAfterDeactivate = await request(app)
    .get("/api/auth/profile")
    .set(auth(sessionTokenAfterRoleChange));
  expectStatus(staleAfterDeactivate, 401, "token tras desactivacion");
  pass("desactivacion revoca sesion");

  const audits = await prisma.auditEvent.findMany({
    orderBy: { id: "asc" },
  });

  const serializedAudits = JSON.stringify(audits);

  const forbiddenSecrets = [
    adminPassword,
    ...generatedPasswords,
    "Bearer ",
  ];

  for (const secret of forbiddenSecrets) {
    ensure(
      !serializedAudits.includes(secret),
      "auditoria contiene material sensible"
    );
  }

  pass("auditoria no contiene passwords ni Bearer tokens");
  console.log("E2E_RESULT=PASS");
} catch (error) {
  console.error(`E2E_RESULT=FAIL ${error.message}`);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}