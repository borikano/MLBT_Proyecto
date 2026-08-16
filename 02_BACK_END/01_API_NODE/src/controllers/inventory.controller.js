import { asyncHandler } from "../utils/async-handler.js";
import {
  listInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deactivateInventory,
  listInventoryMovements,
  getInventoryMovementById,
  createInventoryMovement
} from "../services/inventory.service.js";
import { buildAuditContext } from "../security/audit-context.js";

const listInventoryController = asyncHandler(async (req, res) => {
  const productos = await listInventory(req.validated.query || {});

  return res.json({
    ok: true,
    data: productos
  });
});

const getInventoryByIdController = asyncHandler(async (req, res) => {
  const producto = await getInventoryById(req.validated.params.id);

  return res.json({
    ok: true,
    data: producto
  });
});

const createInventoryController = asyncHandler(async (req, res) => {
  const producto = await createInventory(req.validated.body);

  return res.status(201).json({
    ok: true,
    message: "Producto de inventario creado correctamente",
    data: producto
  });
});

const updateInventoryController = asyncHandler(async (req, res) => {
  const producto = await updateInventory(
    req.validated.params.id,
    req.validated.body
  );

  return res.json({
    ok: true,
    message: "Producto de inventario actualizado correctamente",
    data: producto
  });
});

const deactivateInventoryController = asyncHandler(async (req, res) => {
  const producto = await deactivateInventory(req.validated.params.id);

  return res.json({
    ok: true,
    message: "Producto de inventario inactivado correctamente",
    data: producto
  });
});

const listInventoryMovementsController = asyncHandler(async (req, res) => {
  const movimientos = await listInventoryMovements(req.validated.query || {});

  return res.json({
    ok: true,
    data: movimientos
  });
});

const getInventoryMovementByIdController = asyncHandler(async (req, res) => {
  const movimiento = await getInventoryMovementById(req.validated.params.id);

  return res.json({
    ok: true,
    data: movimiento
  });
});

const createInventoryMovementController = asyncHandler(async (req, res) => {
  const movimiento = await createInventoryMovement(
    req.validated.body,
    req.user?.id
  , buildAuditContext(req, req.validated.body?.motivo));

  return res.status(201).json({
    ok: true,
    message: "Movimiento de inventario registrado correctamente",
    data: movimiento
  });
});

export {
  listInventoryController,
  getInventoryByIdController,
  createInventoryController,
  updateInventoryController,
  deactivateInventoryController,
  listInventoryMovementsController,
  getInventoryMovementByIdController,
  createInventoryMovementController
};
