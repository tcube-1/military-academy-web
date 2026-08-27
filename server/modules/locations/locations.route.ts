import { Router } from "express";
import { LocationsController } from "./locations.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { authorize } from "../security/policy.js";
import { PERMISSIONS } from "../security/permissions.js";

const locationsRouter = Router();

locationsRouter.use(requireAuth);
// Need students or system level read, we can create a generic reference permission or just use STUDENTS_READ 
// Locations are somewhat public reference data for authenticated users.

locationsRouter.get("/states", authorize(PERMISSIONS.STUDENTS_READ), LocationsController.getStates);
locationsRouter.get("/districts", authorize(PERMISSIONS.STUDENTS_READ), LocationsController.getDistricts);
locationsRouter.get("/mandals", authorize(PERMISSIONS.STUDENTS_READ), LocationsController.getMandals);
locationsRouter.get("/villages", authorize(PERMISSIONS.STUDENTS_READ), LocationsController.getVillages);

export { locationsRouter };
