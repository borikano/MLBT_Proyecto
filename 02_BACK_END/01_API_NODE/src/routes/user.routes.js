import { Router } from "express";

import {
  listUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deactivateUserController
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { allowPermissions } from "../middlewares/authorization.middleware.js";
import { PERMISSIONS } from "../security/permissions.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, updateUserSchema, userQuerySchema, userByIdSchema, deactivateUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.use(authRequired);

router.get("/", allowPermissions(PERMISSIONS.USERS_READ), validate(userQuerySchema), listUsersController);
router.get("/:id", allowPermissions(PERMISSIONS.USERS_READ), validate(userByIdSchema), getUserByIdController);
router.post("/", allowPermissions(PERMISSIONS.USERS_CREATE), validate(createUserSchema), createUserController);
router.put("/:id", allowPermissions(PERMISSIONS.USERS_UPDATE), validate(updateUserSchema), updateUserController);
router.delete("/:id", allowPermissions(PERMISSIONS.USERS_DEACTIVATE), validate(deactivateUserSchema), deactivateUserController);

export { router as userRoutes };
