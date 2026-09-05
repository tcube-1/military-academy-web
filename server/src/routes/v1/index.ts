import { Router } from "express";
import { db } from "../../database/db.js";
import { sql } from "drizzle-orm";


import {
  rolesRouter,
  permissionsRouter,
} from "../../modules/roles/roles.route.js";
import { locationsRouter } from "../../modules/locations/locations.route.js";
import { forcesRouter } from "../../modules/forces/forces.route.js";
import { studentsRouter } from "../../modules/students/students.route.js";



const v1Router = Router();

// Health check
v1Router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "OK",
      timestamp: new Date(),
    },
  });
});

// Readiness check
v1Router.get("/ready", async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);

    res.status(200).json({
      success: true,
      data: {
        status: "READY",
        database: "connected",
        timestamp: new Date(),
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      error: {
        code: "SERVICE_UNAVAILABLE",
        message: "Database connection failed",
      },
    });
  }
});

// Auth.js


// Application routes

// v1Router.use("/roles", rolesRouter);
// v1Router.use("/permissions", permissionsRouter);
// v1Router.use("/locations", locationsRouter);
// v1Router.use("/forces", forcesRouter);
// v1Router.use("/students", studentsRouter);

export { v1Router };