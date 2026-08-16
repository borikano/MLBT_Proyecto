import { asyncHandler } from "../utils/async-handler.js";
import { listUsers, getUserById, createUser, updateUser, deactivateUser } from "../services/user.service.js";
import { buildAuditContext } from "../security/audit-context.js";

const listUsersController = asyncHandler(async (req, res) => {
  const usuarios = await listUsers(req.validated.query || {});

  res.status(200).json({
    ok: true,
    data: usuarios
  });
});

const getUserByIdController = asyncHandler(async (req, res) => {
  const usuario = await getUserById(req.validated.params.id);

  res.status(200).json({
    ok: true,
    data: usuario
  });
});

const createUserController = asyncHandler(async (req, res) => {
  const usuario = await createUser(req.validated.body);

  res.status(201).json({
    ok: true,
    message: "Usuario creado correctamente",
    data: usuario
  });
});

const updateUserController = asyncHandler(async (req, res) => {
  const usuario = await updateUser(req.validated.params.id, req.validated.body, buildAuditContext(req, req.validated.body?.motivo));

  res.status(200).json({
    ok: true,
    message: "Usuario actualizado correctamente",
    data: usuario
  });
});

const deactivateUserController = asyncHandler(async (req, res) => {
  const usuario = await deactivateUser(req.validated.params.id, buildAuditContext(req, req.validated.body?.motivo));

  res.status(200).json({
    ok: true,
    message: "Usuario inactivado correctamente",
    data: usuario
  });
});

export { listUsersController, getUserByIdController, createUserController, updateUserController, deactivateUserController };
