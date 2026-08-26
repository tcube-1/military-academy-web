import { env } from "./env";
import type { AuthConfig } from "@auth/core";

export const authConfig: AuthConfig = {
  providers: [], // Providers will be added in Phase 3/5
  secret: env.AUTH_SECRET,
  trustHost: true,
};
