import { Router } from "express";
import { UsersController } from "./users.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { authorize } from "../security/policy.js";
import { validate } from "../../middleware/validate.js";
import { PERMISSIONS } from "../security/permissions.js";
import { asyncHandler } from "../../config/asyncHandler.js";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  assignRoleSchema,
  removeRoleSchema,
} from "./users.schema.js";

const usersRouter = Router();

usersRouter.use(requireAuth);

usersRouter.get(
  "/",
  authorize(PERMISSIONS.USERS_READ),
  asyncHandler(UsersController.getUsers)
);

usersRouter.get(
  "/:id",
  authorize(PERMISSIONS.USERS_READ),
  validate(getUserSchema),
  asyncHandler(UsersController.getUser)
);

usersRouter.post(
  "/",
  authorize(PERMISSIONS.USERS_CREATE),
  validate(createUserSchema),
  asyncHandler(UsersController.createUser)
);

usersRouter.patch(
  "/:id",
  authorize(PERMISSIONS.USERS_UPDATE),
  validate(updateUserSchema),
  asyncHandler(UsersController.updateUser)
);

usersRouter.delete(
  "/:id",
  authorize(PERMISSIONS.USERS_DELETE),
  validate(getUserSchema),
  asyncHandler(UsersController.deleteUser)
);

usersRouter.post(
  "/:id/roles",
  authorize(PERMISSIONS.ROLES_MANAGE),
  validate(assignRoleSchema),
  asyncHandler(UsersController.assignRole)
);

usersRouter.delete(
  "/:id/roles/:roleId",
  authorize(PERMISSIONS.ROLES_MANAGE),
  validate(removeRoleSchema),
  asyncHandler(UsersController.removeRole)
);

export { usersRouter };
