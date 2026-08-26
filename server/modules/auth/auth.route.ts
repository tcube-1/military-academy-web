import { Router } from "express";
import { ExpressAuth } from "@auth/express";
import { env } from "../../config/env";

const authRouter = Router();

// Auth.js configuration.
// Providers will be added here (e.g. Credentials, OAuth, etc.)
// For now, setting up the basic boundary.
authRouter.use(ExpressAuth({
  providers: [],
  secret: env.AUTH_SECRET,
  trustHost: true,
  // Add database adapter here in future phases when full user schema is ready
}));

export { authRouter };
