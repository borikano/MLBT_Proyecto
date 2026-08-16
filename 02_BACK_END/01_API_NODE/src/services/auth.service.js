import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma.js";
import { config } from "../config/env.js";
import { createHttpError } from "../utils/http-error.js";
import { buildSessionTokenPayload } from "../security/session-security.js";
import { writeBestEffortAudit } from "./audit.service.js";

function buildPublicUser(usuario) {
  return {
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
}

async function login({ username, password }, auditContext = {}) {
  const usuario = await prisma.usuario.findUnique({
    where: { username }
  });

  if (!usuario || usuario.estado !== "ACTIVO") {
    await writeBestEffortAudit({ ...auditContext, usuarioId: usuario?.id ?? null, role: usuario?.rol ?? null, modulo: "auth", accion: "login", resultado: "FAILURE" });
    throw createHttpError(401, "Usuario o contrasena invalidos");
  }

  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

  if (!passwordValida) {
    await writeBestEffortAudit({ ...auditContext, usuarioId: usuario?.id ?? null, role: usuario?.rol ?? null, modulo: "auth", accion: "login", resultado: "FAILURE" });
    throw createHttpError(401, "Usuario o contrasena invalidos");
  }

  const token = jwt.sign(
    buildSessionTokenPayload(usuario),
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  await writeBestEffortAudit({ ...auditContext, usuarioId: usuario.id, role: usuario.rol, modulo: "auth", accion: "login", resultado: "SUCCESS" });
  return {
    message: "Autenticacion satisfactoria",
    token,
    usuario: buildPublicUser(usuario)
  };
}

function getProfile(user) {
  return {
    message: "Perfil autenticado",
    usuario: user
  };
}

export { login, getProfile, buildPublicUser };
