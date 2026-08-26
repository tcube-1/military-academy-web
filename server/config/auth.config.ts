import { env } from "./env";
import type { ExpressAuthConfig } from "@auth/express";

export const authConfig: ExpressAuthConfig = {
  providers: [],
  secret: env.AUTH_SECRET,
  trustHost: true,
};
