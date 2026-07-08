import { asyncHandler } from "../utils/async-handler.js";
import { listInventory, getInventoryById, createInventory, updateInventory, deactivateInventory } from "../services/inventory.service.js";

const listInventoryController = asyncHandler(async (req, res) => {
  const productos = await listInventory(req.validated.query || {});

  res.status(200).json({
    ok: true,
    data: productos
  });
});

const getInventoryByIdController = asyncHandler(async (req, res) => {
  const producto = await getInventoryById(req.validated.params.id);

  res.status(200).json({
    ok: true,
    data: producto
  });
});

const createInventoryController = asyncHandler(async (req, res) => {
  const producto = await createInventory(req.validated.body);

  res.status(201).json({
    ok: true,
    message: "Producto de inventario creado correctamente",
    data: producto
  });
});

const updateInventoryController = asyncHandler(async (req, res) => {
  const producto = await updateInventory(req.validated.params.id, req.validated.body);

  res.status(200).json({
    ok: true,
    message: "Producto de inventario actualizado correctamente",
    data: producto
  });
});

const deactivateInventoryController = asyncHandler(async (req, res) => {
  const producto = await deactivateInventory(req.validated.params.id);

  res.status(200).json({
    ok: true,
    message: "Producto de inventario inactivado correctamente",
    data: producto
  });
});

export { listInventoryController, getInventoryByIdController, createInventoryController, updateInventoryController, deactivateInventoryController };
