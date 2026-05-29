import { Router } from "express";

import {
  listUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deactivateUserController
} from "../controllers/user.controller.js";
import { authRequired, allowRoles } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema, userQuerySchema, userByIdSchema } from "../schemas/user.schema.js";

const router = Router();

router.use(authRequired);

router.get("/", validate(userQuerySchema), listUsersController);
router.get("/:id", validate(userByIdSchema), getUserByIdController);
router.post("/", allowRoles("ADMIN_APP", "ADMIN_TIENDA"), validate(createUserSchema), createUserController);
router.put("/:id", allowRoles("ADMIN_APP", "ADMIN_TIENDA"), validate(updateUserSchema), updateUserController);
router.delete("/:id", allowRoles("ADMIN_APP", "ADMIN_TIENDA"), validate(userByIdSchema), deactivateUserController);

export { router as userRoutes };
