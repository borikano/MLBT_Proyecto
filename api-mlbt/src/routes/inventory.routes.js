import { Router } from "express";

import {
  listInventoryController,
  getInventoryByIdController,
  createInventoryController,
  updateInventoryController,
  deactivateInventoryController
} from "../controllers/inventory.controller.js";
import { authRequired, allowRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createInventorySchema, updateInventorySchema, inventoryQuerySchema, inventoryByIdSchema } from "../schemas/inventory.schema.js";

const router = Router();

router.use(authRequired);

router.get("/", validate(inventoryQuerySchema), listInventoryController);
router.get("/:id", validate(inventoryByIdSchema), getInventoryByIdController);
router.post("/", allowRoles("ADMIN_APP", "ADMIN_TIENDA", "BODEGA"), validate(createInventorySchema), createInventoryController);
router.put("/:id", allowRoles("ADMIN_APP", "ADMIN_TIENDA", "BODEGA"), validate(updateInventorySchema), updateInventoryController);
router.delete("/:id", allowRoles("ADMIN_APP", "ADMIN_TIENDA", "BODEGA"), validate(inventoryByIdSchema), deactivateInventoryController);

export { router as inventoryRoutes };
