import { prisma } from "../config/prisma.js";
import {
  AUDIT_RESULTS,
  MAX_AUDIT_METADATA_CHARS
} from "../constants/audit.constants.js";

const BLOCKED_METADATA_KEYS = new Set([
  "authorization",
  "jwt",
  "password",
  "passwordhash",
  "secret",
  "token"
]);

function sanitizeAuditMetadata(metadata = {}, allowedKeys = []) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return null;
  }

  const safe = {};

  for (const key of allowedKeys) {
    if (BLOCKED_METADATA_KEYS.has(String(key).toLowerCase())) {
      continue;
    }

    if (!Object.prototype.hasOwnProperty.call(metadata, key)) {
      continue;
    }

    const value = metadata[key];

    if (
      value === null ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      safe[key] = value;
    }
  }

  if (Object.keys(safe).length === 0) {
    return null;
  }

  if (JSON.stringify(safe).length > MAX_AUDIT_METADATA_CHARS) {
    throw new Error("Audit metadata exceeds safe size");
  }

  return safe;
}

function buildAuditData({
  usuarioId = null,
  role = null,
  modulo,
  accion,
  resultado,
  entidad = null,
  entidadId = null,
  motivo = null,
  requestId = null,
  ip = null,
  metadata = null,
  metadataKeys = []
}) {
  if (!modulo || !accion || !resultado) {
    throw new Error("Audit event requires modulo, accion and resultado");
  }

  if (!Object.values(AUDIT_RESULTS).includes(resultado)) {
    throw new Error("Audit event has invalid resultado");
  }

  return {
    usuarioId,
    role,
    modulo,
    accion,
    resultado,
    entidad,
    entidadId: entidadId === null ? null : String(entidadId),
    motivo,
    requestId,
    ip,
    metadata: sanitizeAuditMetadata(metadata, metadataKeys)
  };
}

async function createAuditEvent(event, db = prisma) {
  return db.auditEvent.create({
    data: buildAuditData(event)
  });
}

async function createAuditEventBestEffort(event, db = prisma) {
  try {
    return await createAuditEvent(event, db);
  } catch {
    console.error("No se pudo persistir el evento de auditoria.");
    return null;
  }
}

const SENSITIVE_METADATA_KEYS = new Set(["beforeRole", "afterRole", "beforeStatus", "afterStatus", "oldPrice", "newPrice", "recipeChanged", "movementType", "requiredRoles", "currentRole", "method", "path"]);
function sanitizeSensitiveAuditMetadata(metadata = {}) { const safe = {}; for (const [key,value] of Object.entries(metadata || {})) { if (!SENSITIVE_METADATA_KEYS.has(key)) continue; if (Array.isArray(value)) safe[key] = value.slice(0,20).map((item)=>String(item).slice(0,120)); else if (["string","number","boolean"].includes(typeof value)) safe[key] = typeof value === "string" ? value.slice(0,240) : value; } return Object.keys(safe).length ? safe : undefined; }
async function writeSensitiveAudit(client, event) { const db = client || prisma; return db.auditEvent.create({ data: { usuarioId: event.usuarioId ?? null, role: event.role ?? null, modulo: event.modulo, accion: event.accion, resultado: event.resultado || "SUCCESS", entidad: event.entidad ?? null, entidadId: event.entidadId == null ? null : String(event.entidadId), motivo: event.motivo ?? null, requestId: event.requestId ?? null, ip: event.ip ?? null, metadata: sanitizeSensitiveAuditMetadata(event.metadata) } }); }
async function writeBestEffortAudit(event) { try { await writeSensitiveAudit(prisma, event); return true; } catch { return false; } }

export {
  buildAuditData,
  createAuditEvent,
  createAuditEventBestEffort,
  sanitizeAuditMetadata
, sanitizeSensitiveAuditMetadata, writeSensitiveAudit, writeBestEffortAudit };
