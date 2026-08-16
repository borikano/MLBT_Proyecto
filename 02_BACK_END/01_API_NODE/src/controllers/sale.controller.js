import { asyncHandler } from "../utils/async-handler.js";
import {
  listSaleProducts,
  getSaleProductById,
  createSaleProduct,
  updateSaleProduct,
  deactivateSaleProduct,
  listSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
} from "../services/sale.service.js";
import { buildAuditContext } from "../security/audit-context.js";

const listSaleProductsController = asyncHandler(async (req, res) => {
  const productos = await listSaleProducts(req.validated.query || {});

  return res.json({
    ok: true,
    data: productos
  });
});

const getSaleProductByIdController = asyncHandler(async (req, res) => {
  const producto = await getSaleProductById(req.validated.params.id);

  return res.json({
    ok: true,
    data: producto
  });
});

const createSaleProductController = asyncHandler(async (req, res) => {
  const producto = await createSaleProduct(req.validated.body);

  return res.status(201).json({
    ok: true,
    message: "Producto de venta creado correctamente",
    data: producto
  });
});

const updateSaleProductController = asyncHandler(async (req, res) => {
  const producto = await updateSaleProduct(
    req.validated.params.id,
    req.validated.body
  , buildAuditContext(req, req.validated.body?.motivo));

  return res.json({
    ok: true,
    message: "Producto de venta actualizado correctamente",
    data: producto
  });
});

const deactivateSaleProductController = asyncHandler(async (req, res) => {
  const producto = await deactivateSaleProduct(req.validated.params.id);

  return res.json({
    ok: true,
    message: "Producto de venta inactivado correctamente",
    data: producto
  });
});

const listSalesController = asyncHandler(async (req, res) => {
  const ventas = await listSales(req.validated.query || {});

  return res.json({
    ok: true,
    data: ventas
  });
});

const getSaleByIdController = asyncHandler(async (req, res) => {
  const venta = await getSaleById(req.validated.params.id);

  return res.json({
    ok: true,
    data: venta
  });
});

const createSaleController = asyncHandler(async (req, res) => {
  const venta = await createSale(req.validated.body, req.user?.id);

  return res.status(201).json({
    ok: true,
    message: "Venta creada correctamente",
    data: venta
  });
});

const updateSaleController = asyncHandler(async (req, res) => {
  const venta = await updateSale(
    req.validated.params.id,
    req.validated.body
  );

  return res.json({
    ok: true,
    message: "Venta actualizada correctamente",
    data: venta
  });
});

const deleteSaleController = asyncHandler(async (req, res) => {
  const venta = await deleteSale(req.validated.params.id, req.user?.id, buildAuditContext(req, req.validated.body?.motivo));

  return res.json({
    ok: true,
    message: "Venta anulada correctamente",
    data: venta
  });
});

export {
  listSaleProductsController,
  getSaleProductByIdController,
  createSaleProductController,
  updateSaleProductController,
  deactivateSaleProductController,
  listSalesController,
  getSaleByIdController,
  createSaleController,
  updateSaleController,
  deleteSaleController
};
