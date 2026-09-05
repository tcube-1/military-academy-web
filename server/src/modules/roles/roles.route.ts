import { Router } from "express";
import { RolesController } from "./roles.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { authorize } from "../security/policy.js";
import { validate } from "../../middleware/validate.js";
import { PERMISSIONS } from "../security/permissions.js";
import { asyncHandler } from "../../config/asyncHandler.js";
import { getRoleSchema } from "./roles.schema.js";

const rolesRouter = Router();

rolesRouter.use(requireAuth);

rolesRouter.get(
  "/",
  authorize(PERMISSIONS.ROLES_READ),
  asyncHandler(RolesController.getRoles)
);

rolesRouter.get(
  "/:id",
  authorize(PERMISSIONS.ROLES_READ),
  validate(getRoleSchema),
  asyncHandler(RolesController.getRole)
);

// Permissions Endpoint
const permissionsRouter = Router();
permissionsRouter.use(requireAuth);

permissionsRouter.get(
  "/",
  authorize(PERMISSIONS.PERMISSIONS_READ),
  asyncHandler(RolesController.getPermissions)
);

export { rolesRouter, permissionsRouter };
