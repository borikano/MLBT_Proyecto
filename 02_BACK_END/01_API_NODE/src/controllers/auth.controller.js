import { asyncHandler } from "../utils/async-handler.js";
import { login, getProfile } from "../services/auth.service.js";
import { buildAuditContext } from "../security/audit-context.js";

const loginController = asyncHandler(async (req, res) => {
  const result = await login(req.validated.body, buildAuditContext(req, null));

  res.status(200).json({
    ok: true,
    ...result
  });
});

const profileController = asyncHandler(async (req, res) => {
  const result = getProfile(req.user);

  res.status(200).json({
    ok: true,
    ...result
  });
});

export { loginController, profileController };
