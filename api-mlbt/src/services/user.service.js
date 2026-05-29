import bcrypt from "bcrypt";

import { prisma } from "../config/prisma.js";
import { config } from "../config/env.js";
import { createHttpError } from "../utils/http-error.js";
import { buildPublicUser } from "./auth.service.js";

function buildUserWhere(query = {}) {
  const where = {};

  if (query.buscar) {
    where.OR = [
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

async function listUsers(query = {}) {
  const usuarios = await prisma.usuario.findMany({
    where: buildUserWhere(query),
    orderBy: { id: "asc" }
  });

  return usuarios.map(buildPublicUser);
}

async function getUserById(id) {
  const usuario = await prisma.usuario.findUnique({
    where: { id }
  });

  if (!usuario) {
    throw createHttpError(404, "Usuario no encontrado");
  }

  return buildPublicUser(usuario);
}

async function createUser(data) {
  const existente = await prisma.usuario.findFirst({
    where: {
      OR: [
        { username: data.username },
        data.email ? { email: data.email } : undefined
      ].filter(Boolean)
    }
  });

  if (existente) {
    throw createHttpError(409, "Ya existe un usuario con ese username o email");
  }

  const passwordHash = await bcrypt.hash(data.password, config.bcryptSaltRounds);

  const usuario = await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      username: data.username,
      email: data.email || null,
      passwordHash,
      rol: data.rol,
      estado: data.estado
    }
  });

  return buildPublicUser(usuario);
}

async function updateUser(id, data) {
  await getUserById(id);

  const updateData = { ...data };

  if (data.password) {
    updateData.passwordHash = await bcrypt.hash(data.password, config.bcryptSaltRounds);
    delete updateData.password;
  }

  if (Object.prototype.hasOwnProperty.call(updateData, "email") && !updateData.email) {
    updateData.email = null;
  }

  const usuario = await prisma.usuario.update({
    where: { id },
    data: updateData
  });

  return buildPublicUser(usuario);
}

async function deactivateUser(id) {
  await getUserById(id);

  const usuario = await prisma.usuario.update({
    where: { id },
    data: { estado: "INACTIVO" }
  });

  return buildPublicUser(usuario);
}

export { listUsers, getUserById, createUser, updateUser, deactivateUser };
