import { Router } from "express";

import {
  listSalesController,
  getSaleByIdController,
  createSaleController,
  updateSaleController,
  deleteSaleController
} from "../controllers/sale.controller.js";
import { authRequired, allowRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSaleSchema, updateSaleSchema, saleQuerySchema, saleByIdSchema } from "../schemas/sale.schema.js";

const router = Router();

router.use(authRequired);

router.get("/", validate(saleQuerySchema), listSalesController);
router.get("/:id", validate(saleByIdSchema), getSaleByIdController);
router.post("/", allowRoles("ADMIN_APP", "ADMIN_TIENDA", "MESERO", "CAJERO"), validate(createSaleSchema), createSaleController);
router.put("/:id", allowRoles("ADMIN_APP", "ADMIN_TIENDA", "CAJERO"), validate(updateSaleSchema), updateSaleController);
router.delete("/:id", allowRoles("ADMIN_APP", "ADMIN_TIENDA"), validate(saleByIdSchema), deleteSaleController);

export { router as saleRoutes };
