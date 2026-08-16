import jwt from "jsonwebtoken";

import { config } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { isSessionVersionValid } from "../security/session-security.js";
import { writeBestEffortAudit } from "../services/audit.service.js";

async function authRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      void writeBestEffortAudit({ usuarioId: req.user?.id ?? null, role: req.user?.rol ?? null, modulo: "auth", accion: "session_rejected", resultado: "DENIED", requestId: req.requestId ?? null, ip: req.ip ?? null, metadata: { method: req.method, path: req.originalUrl } });

      return res.status(401).json({
        ok: false,
        message: "Token de autenticacion requerido"
      });
    }

    const payload = jwt.verify(token, config.jwtSecret);

    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.id }
    });

    if (!usuario || usuario.estado !== "ACTIVO") {
      void writeBestEffortAudit({ usuarioId: req.user?.id ?? null, role: req.user?.rol ?? null, modulo: "auth", accion: "session_rejected", resultado: "DENIED", requestId: req.requestId ?? null, ip: req.ip ?? null, metadata: { method: req.method, path: req.originalUrl } });

      return res.status(401).json({
        ok: false,
        message: "Usuario no autorizado"
      });
    }
    if (!isSessionVersionValid(payload, usuario)) {
      void writeBestEffortAudit({ usuarioId: req.user?.id ?? null, role: req.user?.rol ?? null, modulo: "auth", accion: "session_rejected", resultado: "DENIED", requestId: req.requestId ?? null, ip: req.ip ?? null, metadata: { method: req.method, path: req.originalUrl } });

      return res.status(401).json({
        ok: false,
        message: "Sesion invalida o revocada"
      });
    }

    req.user = {
      id: usuario.id,
      numeroRegistro: usuario.numeroRegistro ?? null,
      documento: usuario.documento ?? null,
      nombres: usuario.nombres ?? null,
      apellidos: usuario.apellidos ?? null,
      telefono: usuario.telefono ?? null,
      nombre: usuario.nombre,
      username: usuario.username,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado,
      createdAt: usuario.createdAt ?? null,
      updatedAt: usuario.updatedAt ?? null
    };

    return next();
  } catch (error) {
    void writeBestEffortAudit({ usuarioId: req.user?.id ?? null, role: req.user?.rol ?? null, modulo: "auth", accion: "session_rejected", resultado: "DENIED", requestId: req.requestId ?? null, ip: req.ip ?? null, metadata: { method: req.method, path: req.originalUrl } });

    return res.status(401).json({
      ok: false,
      message: "Token invalido o expirado"
    });
  }
}

function allowRoles(...roles) {
  return function roleMiddleware(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado"
      });
    }

    if (!roles.includes(req.user.rol)) {
      void writeBestEffortAudit({ usuarioId: req.user.id, role: req.user.rol, modulo: "auth", accion: "permission_denied", resultado: "DENIED", requestId: req.requestId ?? null, ip: req.ip ?? null, metadata: { requiredRoles: roles, currentRole: req.user.rol, method: req.method, path: req.originalUrl } });
      return res.status(403).json({
        ok: false,
        message: "No tiene permisos para ejecutar esta accion"
      });
    }

    return next();
  };
}

export { authRequired, allowRoles };
