import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma.js";
import { config } from "../config/env.js";
import { createHttpError } from "../utils/http-error.js";

function buildPublicUser(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    username: usuario.username,
    email: usuario.email,
    rol: usuario.rol,
    estado: usuario.estado
  };
}

async function login({ username, password }) {
  const usuario = await prisma.usuario.findUnique({
    where: { username }
  });

  if (!usuario || usuario.estado !== "ACTIVO") {
    throw createHttpError(401, "Usuario o contrasena invalidos");
  }

  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

  if (!passwordValida) {
    throw createHttpError(401, "Usuario o contrasena invalidos");
  }

  const token = jwt.sign(
    { id: usuario.id, username: usuario.username, rol: usuario.rol },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

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
