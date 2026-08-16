import bcrypt from "bcrypt";

import { prisma } from "../config/prisma.js";
import { config } from "../config/env.js";
import { createHttpError } from "../utils/http-error.js";
import { buildPublicUser } from "./auth.service.js";
import { buildSessionRevocationPatch } from "../security/session-security.js";
import { writeSensitiveAudit } from "./audit.service.js";
import { requireAuditReason } from "../security/audit-context.js";


function buildUserWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.OR = [
      { numeroRegistro: { contains: query.buscar } },
      { documento: { contains: query.buscar } },
      { nombres: { contains: query.buscar } },
      { apellidos: { contains: query.buscar } },
      { telefono: { contains: query.buscar } },
      { nombre: { contains: query.buscar } },
      { username: { contains: query.buscar } },
      { email: { contains: query.buscar } }
    ];
  }

  if (query.rol) {
    where.rol = query.rol;
  }

  if (query.estado) {
    where.estado = query.estado;
  }

  return where;
}

function buildDisplayName(data, currentUser = null) {
  const nombres = data.nombres ?? currentUser?.nombres;
  const apellidos = data.apellidos ?? currentUser?.apellidos;

  if (nombres && apellidos) {
    return `${nombres.trim()} ${apellidos.trim()}`.trim();
  }

  if (data.nombre) {
    return data.nombre.trim();
  }

  return currentUser?.nombre ?? "";
}

// Mantiene un identificador estable aunque el usuario cambie de rol.
function buildRegistrationNumber(id) {
  return `USR-${String(id).padStart(6, "0")}`;
}

async function findUserRecordById(id) {
  const usuario = await prisma.usuario.findUnique({
    where: { id }
  });

  if (!usuario) {
    throw createHttpError(404, "Usuario no encontrado");
  }

  return usuario;
}

async function ensureUniqueUserFields(data, excludedId = null) {
  const conditions = [];

  if (data.username) {
    conditions.push({ username: data.username });
  }

  if (data.email) {
    conditions.push({ email: data.email });
  }

  if (data.documento) {
    conditions.push({ documento: data.documento });
  }

  if (conditions.length === 0) {
    return;
  }

  const where = { OR: conditions };

  if (excludedId) {
    where.id = { not: excludedId };
  }

  const existente = await prisma.usuario.findFirst({ where });

  if (existente) {
    throw createHttpError(
      409,
      "Ya existe un usuario con ese username, email o documento"
    );
  }
}

async function listUsers(query = {}) {
  const usuarios = await prisma.usuario.findMany({
    where: buildUserWhere(query),
    orderBy: { id: "asc" }
  });

  return usuarios.map(buildPublicUser);
}

async function getUserById(id) {
  const usuario = await findUserRecordById(id);
  return buildPublicUser(usuario);
}

async function createUser(data) {
  await ensureUniqueUserFields(data);

  const passwordHash = await bcrypt.hash(data.password, config.bcryptSaltRounds);

  // El numero de registro se deriva del id persistido para evitar secuencias locales.
  const usuario = await prisma.$transaction(async (tx) => {
    const creado = await tx.usuario.create({
      data: {
        numeroRegistro: null,
        documento: data.documento || null,
        nombres: data.nombres || null,
        apellidos: data.apellidos || null,
        telefono: data.telefono || null,
        nombre: buildDisplayName(data),
        username: data.username,
        email: data.email || null,
        passwordHash,
        rol: data.rol,
        estado: data.estado
      }
    });

    return tx.usuario.update({
      where: { id: creado.id },
      data: {
        numeroRegistro: buildRegistrationNumber(creado.id)
      }
    });
  });

  return buildPublicUser(usuario);
}

async function updateUser(id, data, auditContext = {}) {
  const { motivo: auditMotivo, ...businessData } = data;
  data = businessData;
  auditContext = { ...auditContext, motivo: auditContext.motivo || auditMotivo };
  const currentUser = await findUserRecordById(id);
  await ensureUniqueUserFields(data, id);

  const updateData = { ...data };

  if (data.password) {
    updateData.passwordHash = await bcrypt.hash(data.password, config.bcryptSaltRounds);
    delete updateData.password;
  }

  if (
    Object.prototype.hasOwnProperty.call(data, "nombre") ||
    Object.prototype.hasOwnProperty.call(data, "nombres") ||
    Object.prototype.hasOwnProperty.call(data, "apellidos")
  ) {
    updateData.nombre = buildDisplayName(data, currentUser);
  }

  if (Object.prototype.hasOwnProperty.call(updateData, "email") && !updateData.email) {
    updateData.email = null;
  }

  if (!currentUser.numeroRegistro) {
    updateData.numeroRegistro = buildRegistrationNumber(currentUser.id);
  }

  Object.assign(
    updateData,
    buildSessionRevocationPatch(currentUser, data)
  );

  const usuario = await prisma.$transaction(async (tx) => {
    const auditBeforeUser = await tx.usuario.findUnique({ where: { id }, select: { rol: true, estado: true } });
    const auditUpdatedUser = await tx.usuario.update({
    where: { id },
    data: updateData
  });
    const roleChanged = auditBeforeUser && auditUpdatedUser.rol !== auditBeforeUser.rol;
    const statusChanged = auditBeforeUser && auditUpdatedUser.estado !== auditBeforeUser.estado;
    if (roleChanged || statusChanged) {
      const reason = requireAuditReason(auditContext.motivo, "cambio de rol o estado");
      if (roleChanged) await writeSensitiveAudit(tx, { ...auditContext, motivo: reason, modulo: "users", accion: "role_changed", resultado: "SUCCESS", entidad: "Usuario", entidadId: id, metadata: { beforeRole: auditBeforeUser.rol, afterRole: auditUpdatedUser.rol } });
      if (statusChanged) await writeSensitiveAudit(tx, { ...auditContext, motivo: reason, modulo: "users", accion: "status_changed", resultado: "SUCCESS", entidad: "Usuario", entidadId: id, metadata: { beforeStatus: auditBeforeUser.estado, afterStatus: auditUpdatedUser.estado } });
    }
    return auditUpdatedUser;
  });

  return buildPublicUser(usuario);
}

async function deactivateUser(id, auditContext = {}) {
  const currentUser = await findUserRecordById(id);
  const sessionPatch = buildSessionRevocationPatch(currentUser, {
    estado: "RETIRADO"
  });

  const usuario = await prisma.$transaction(async (tx) => {
    const auditBeforeDeactivation = await tx.usuario.findUnique({ where: { id }, select: { rol: true, estado: true } });
    const auditRetiredUser = await tx.usuario.update({
    where: { id },
    data: {
      estado: "RETIRADO",
      ...sessionPatch
    }
  });
    if (auditBeforeDeactivation && auditRetiredUser.estado !== auditBeforeDeactivation.estado) {
      const reason = requireAuditReason(auditContext.motivo, "retiro de usuario");
      await writeSensitiveAudit(tx, { ...auditContext, motivo: reason, modulo: "users", accion: "deactivated", resultado: "SUCCESS", entidad: "Usuario", entidadId: id, metadata: { beforeStatus: auditBeforeDeactivation.estado, afterStatus: auditRetiredUser.estado } });
    }
    return auditRetiredUser;
  });

  return buildPublicUser(usuario);
}

export { listUsers, getUserById, createUser, updateUser, deactivateUser };
