import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { sanitizeSensitiveAuditMetadata, writeSensitiveAudit } from "../services/audit.service.js";
import { requireAuditReason } from "../security/audit-context.js";

test("metadata sensible usa whitelist y descarta secretos", () => { const safe = sanitizeSensitiveAuditMetadata({ beforeRole: "MESERO", password: "x", token: "y" }); assert.deepEqual(safe, { beforeRole: "MESERO" }); });
test("auditoria sensible usa el cliente transaccional recibido", async () => { let payload=null; const client={ auditEvent:{ create:async (value)=>{payload=value; return value;} } }; await writeSensitiveAudit(client,{ modulo:"users", accion:"role_changed", resultado:"SUCCESS", entidadId:7, metadata:{beforeRole:"MESERO"} }); assert.equal(payload.data.entidadId,"7"); });
test("motivo sensible exige al menos tres caracteres", () => { assert.throws(()=>requireAuditReason("  ","operacion"),(error)=>error.statusCode===400); assert.equal(requireAuditReason(" Cambio autorizado ","operacion"),"Cambio autorizado"); });
test("contratos 2C mantienen auditoria operativa y transaccional", () => { const root=new URL("..",import.meta.url); const read=(rel)=>fs.readFileSync(new URL(rel,root),"utf8"); assert.match(read("services/auth.service.js"),/accion: "login"/); assert.match(read("middlewares/auth.middleware.js"),/session_rejected/); assert.match(read("middlewares/auth.middleware.js"),/permission_denied/); assert.match(read("services/user.service.js"),/writeSensitiveAudit\(tx/); assert.match(read("services/inventory.service.js"),/accion: "adjusted"/); assert.match(read("services/sale-cancellation.service.js"),/accion: "cancelled"/); assert.match(read("services/sale-product.service.js"),/price_changed/); })
