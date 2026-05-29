import jwt from "jsonwebtoken";

import { config } from "../config/env.js";
import { prisma } from "../config/prisma.js";

async function authRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
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
      return res.status(401).json({
        ok: false,
        message: "Usuario no autorizado"
      });
    }

    req.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      username: usuario.username,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado
    };

    return next();
  } catch (error) {
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
        message: "Autenticacion requerida"
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        ok: false,
        message: "No tiene permisos para ejecutar esta accion"
      });
    }

    return next();
  };
}

export { authRequired, allowRoles };
