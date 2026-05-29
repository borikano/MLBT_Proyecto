import { Router } from "express";

import { loginController, profileController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validate(loginSchema), loginController);
router.get("/profile", authRequired, profileController);

export { router as authRoutes };
