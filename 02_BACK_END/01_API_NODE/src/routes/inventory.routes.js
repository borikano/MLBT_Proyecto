import { Router } from "express";

import {
  listInventoryController,
  getInventoryByIdController,
  createInventoryController,
  updateInventoryController,
  deactivateInventoryController,
  listInventoryMovementsController,
  getInventoryMovementByIdController,
  createInventoryMovementController
} from "../controllers/inventory.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { allowPermissions } from "../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../security/permissions.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createInventorySchema,
  updateInventorySchema,
  inventoryQuerySchema,
  inventoryByIdSchema,
  createInventoryMovementSchema,
  inventoryMovementQuerySchema,
  inventoryMovementByIdSchema
} from "../schemas/inventory.schema.js";

const router = Router();

router.use(authRequired);

// Las rutas de movimientos se declaran antes de /:id para evitar colisiones.
router.get(
  "/movements", allowPermissions(PERMISSIONS.INVENTORY_READ),
  validate(inventoryMovementQuerySchema),
  listInventoryMovementsController
);
router.get(
  "/movements/:id", allowPermissions(PERMISSIONS.INVENTORY_READ),
  validate(inventoryMovementByIdSchema),
  getInventoryMovementByIdController
);
router.post(
  "/movements",
  allowPermissions(PERMISSIONS.INVENTORY_MOVE),
  validate(createInventoryMovementSchema),
  createInventoryMovementController
);

router.get("/", allowPermissions(PERMISSIONS.INVENTORY_READ), validate(inventoryQuerySchema), listInventoryController);
router.get("/:id", allowPermissions(PERMISSIONS.INVENTORY_READ), validate(inventoryByIdSchema), getInventoryByIdController);
router.post(
  "/",
  allowPermissions(PERMISSIONS.INVENTORY_CREATE),
  validate(createInventorySchema),
  createInventoryController
);
router.put(
  "/:id",
  allowPermissions(PERMISSIONS.INVENTORY_UPDATE),
  validate(updateInventorySchema),
  updateInventoryController
);
router.delete(
  "/:id",
  allowPermissions(PERMISSIONS.INVENTORY_UPDATE),
  validate(inventoryByIdSchema),
  deactivateInventoryController
);

export { router as inventoryRoutes };
