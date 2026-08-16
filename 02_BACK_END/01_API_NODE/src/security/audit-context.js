import { createHttpError } from "../utils/http-error.js";

function buildAuditContext(req, motivo = null) {
  return { usuarioId: req.user?.id ?? null, role: req.user?.rol ?? null, requestId: req.requestId ?? null, ip: req.ip ?? null, motivo: typeof motivo === "string" ? motivo.trim() : null };
}

function requireAuditReason(value, operation) {
  const reason = typeof value === "string" ? value.trim() : "";
  if (reason.length < 3) throw createHttpError(400, `El motivo es obligatorio para ${operation}`);
  return reason;
}

export { buildAuditContext, requireAuditReason };
