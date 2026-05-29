import { asyncHandler } from "../utils/async-handler.js";
import { listSales, getSaleById, createSale, updateSale, deleteSale } from "../services/sale.service.js";

const listSalesController = asyncHandler(async (req, res) => {
  const ventas = await listSales(req.validated.query || {});

  res.status(200).json({
    ok: true,
    data: ventas
  });
});

const getSaleByIdController = asyncHandler(async (req, res) => {
  const venta = await getSaleById(req.validated.params.id);

  res.status(200).json({
    ok: true,
    data: venta
  });
});

const createSaleController = asyncHandler(async (req, res) => {
  const venta = await createSale(req.validated.body);

  res.status(201).json({
    ok: true,
    message: "Venta creada correctamente",
    data: venta
  });
});

const updateSaleController = asyncHandler(async (req, res) => {
  const venta = await updateSale(req.validated.params.id, req.validated.body);

  res.status(200).json({
    ok: true,
    message: "Venta actualizada correctamente",
    data: venta
  });
});

const deleteSaleController = asyncHandler(async (req, res) => {
  const venta = await deleteSale(req.validated.params.id);

  res.status(200).json({
    ok: true,
    message: "Venta eliminada correctamente",
    data: venta
  });
});

export { listSalesController, getSaleByIdController, createSaleController, updateSaleController, deleteSaleController };
