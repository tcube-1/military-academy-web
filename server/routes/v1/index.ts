import { Router } from "express";
import { db } from "../../database/db.js";
import { sql } from "drizzle-orm";

const v1Router = Router();

v1Router.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "OK", timestamp: new Date() } });
});

v1Router.get("/ready", async (req, res, next) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.status(200).json({ success: true, data: { status: "READY", database: "connected", timestamp: new Date() } });
  } catch (error) {
    res.status(503).json({ success: false, error: { code: "SERVICE_UNAVAILABLE", message: "Database connection failed" } });
  }
});

import { authRouter } from "../../modules/auth/auth.route.js";
import { usersRouter } from "../../modules/users/users.route.js";
import { rolesRouter, permissionsRouter } from "../../modules/roles/roles.route.js";
import { locationsRouter } from "../../modules/locations/locations.route.js";
import { forcesRouter } from "../../modules/forces/forces.route.js";
import { studentsRouter } from "../../modules/students/students.route.js";

v1Router.use("/auth", authRouter);
v1Router.use("/users", usersRouter);
v1Router.use("/roles", rolesRouter);
v1Router.use("/permissions", permissionsRouter);
v1Router.use("/locations", locationsRouter);
v1Router.use("/forces", forcesRouter);
v1Router.use("/students", studentsRouter);

export { v1Router };
