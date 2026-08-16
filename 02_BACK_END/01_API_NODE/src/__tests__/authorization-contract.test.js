import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { hasPermission, PERMISSIONS } from "../security/permissions.js";
test("role permission matrix enforces least privilege", () => {
  const checks = [
    ["ADMIN_APP", "USERS_READ", true], ["ADMIN_TIENDA", "SALES_CANCEL", true],
    ["MESERO", "SALES_CREATE", true], ["MESERO", "SALES_CANCEL", false],
    ["COCINA", "SALES_READ", false], ["COCINA", "SALES_PRODUCTS_READ", true],
    ["BODEGA", "INVENTORY_MOVE", true], ["BODEGA", "SALES_READ", false],
    ["CAJERO", "SALES_UPDATE", true], ["CAJERO", "SALES_CANCEL", false],
    ["LECTURA", "USERS_READ", false], ["LECTURA", "INVENTORY_READ", true]
  ];
  for (const [role, permission, expected] of checks) {
    assert.equal(hasPermission(role, PERMISSIONS[permission]), expected);
  }
  assert.equal(hasPermission("DESCONOCIDO", PERMISSIONS.SALES_READ), false);
});
for (const file of [
  "src/routes/user.routes.js",
  "src/routes/inventory.routes.js",
  "src/routes/sale.routes.js"
]) {
  test(`${file} uses permission middleware`, () => {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /allowPermissions\(PERMISSIONS\./);
    assert.doesNotMatch(source, /allowRoles\(/);
  });
}
test("routes expose the required permission families", () => {
  const source = [
    fs.readFileSync("src/routes/user.routes.js", "utf8"),
    fs.readFileSync("src/routes/inventory.routes.js", "utf8"),
    fs.readFileSync("src/routes/sale.routes.js", "utf8")
  ].join("\n");
  for (const permission of [
    "USERS_READ", "INVENTORY_READ", "INVENTORY_MOVE",
    "SALES_READ", "SALES_CREATE", "SALES_CANCEL",
    "SALES_PRODUCTS_READ", "SALES_PRODUCTS_MANAGE"
  ]) {
    assert.match(source, new RegExp(`PERMISSIONS\\.${permission}`));
  }
});
