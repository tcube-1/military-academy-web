import { Router } from "express";
import { StudentsController } from "./students.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { authorize } from "../security/policy.js";
import { PERMISSIONS } from "../security/permissions.js";

const studentsRouter = Router();

studentsRouter.use(requireAuth);

studentsRouter.get("/", authorize(PERMISSIONS.STUDENTS_READ), StudentsController.getStudents);
studentsRouter.get("/:id", authorize(PERMISSIONS.STUDENTS_READ), StudentsController.getStudent);

export { studentsRouter };
