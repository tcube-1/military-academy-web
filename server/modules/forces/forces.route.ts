import { Router } from "express";
import { ForcesController } from "./forces.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { authorize } from "../security/policy.js";
import { PERMISSIONS } from "../security/permissions.js";

const forcesRouter = Router();

forcesRouter.use(requireAuth);

forcesRouter.get("/", authorize(PERMISSIONS.STUDENTS_READ), ForcesController.getForces);
forcesRouter.get("/:id", authorize(PERMISSIONS.STUDENTS_READ), ForcesController.getForce);
forcesRouter.get("/:forceId/roles", authorize(PERMISSIONS.STUDENTS_READ), ForcesController.getForceRoles);

export { forcesRouter };
