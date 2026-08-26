import { Router } from "express";
import { db } from "../../database/db.js";
import { sql } from "drizzle-orm";

const v1Router = Router();

// Health endpoint verifying basic application health
v1Router.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true,
    data: { status: "OK", timestamp: new Date() } 
  });
});

// Readiness endpoint verifying database
v1Router.get("/ready", async (req, res, next) => {
  try {
    // Execute a simple query to verify db connection
    await db.execute(sql`SELECT 1`);
    res.status(200).json({ 
      success: true, 
      data: { status: "READY", database: "connected", timestamp: new Date() } 
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: {
        code: "SERVICE_UNAVAILABLE",
        message: "Database connection failed",
        requestId: req.headers["x-request-id"] || "unknown"
      }
    });
  }
});

import { authRouter } from "../../modules/auth/auth.route.js";
import { usersRouter } from "../../modules/users/users.route.js";
import { rolesRouter, permissionsRouter } from "../../modules/roles/roles.route.js";

// Auth & Security routes will be mounted here
v1Router.use("/auth", authRouter);
v1Router.use("/users", usersRouter);
v1Router.use("/roles", rolesRouter);
v1Router.use("/permissions", permissionsRouter);

export { v1Router };
