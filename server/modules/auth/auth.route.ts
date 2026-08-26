import { Router } from "express";
import { ExpressAuth } from "@auth/express";
import { authConfig } from "../../config/auth.config";

const authRouter = Router();

authRouter.use(ExpressAuth(authConfig));

export { authRouter };
