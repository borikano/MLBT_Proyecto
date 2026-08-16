import { Router } from "express";

import {
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
} from "../controllers/sale.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { allowPermissions } from "../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../security/permissions.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createSaleSchema,
  updateSaleSchema,
  saleQuerySchema,
  saleByIdSchema,
  createSaleProductSchema,
  updateSaleProductSchema,
  saleProductQuerySchema,
  saleProductByIdSchema, cancelSaleSchema } from "../schemas/sale.schema.js";

const router = Router();

router.use(authRequired);

// Las rutas del catalogo se declaran antes de /:id para evitar colisiones.
router.get(
  "/products", allowPermissions(PERMISSIONS.SALES_PRODUCTS_READ),
  validate(saleProductQuerySchema),
  listSaleProductsController
);
router.get(
  "/products/:id", allowPermissions(PERMISSIONS.SALES_PRODUCTS_READ),
  validate(saleProductByIdSchema),
  getSaleProductByIdController
);
router.post(
  "/products",
  allowPermissions(PERMISSIONS.SALES_PRODUCTS_MANAGE),
  validate(createSaleProductSchema),
  createSaleProductController
);
router.put(
  "/products/:id",
  allowPermissions(PERMISSIONS.SALES_PRODUCTS_MANAGE),
  validate(updateSaleProductSchema),
  updateSaleProductController
);
router.delete(
  "/products/:id",
  allowPermissions(PERMISSIONS.SALES_PRODUCTS_MANAGE),
  validate(saleProductByIdSchema),
  deactivateSaleProductController
);

router.get("/", allowPermissions(PERMISSIONS.SALES_READ), validate(saleQuerySchema), listSalesController);
router.get("/:id", allowPermissions(PERMISSIONS.SALES_READ), validate(saleByIdSchema), getSaleByIdController);
router.post(
  "/",
  allowPermissions(PERMISSIONS.SALES_CREATE),
  validate(createSaleSchema),
  createSaleController
);
router.put(
  "/:id",
  allowPermissions(PERMISSIONS.SALES_UPDATE),
  validate(updateSaleSchema),
  updateSaleController
);
router.delete(
  "/:id",
  allowPermissions(PERMISSIONS.SALES_CANCEL),
  validate(cancelSaleSchema), deleteSaleController
);

export { router as saleRoutes };
