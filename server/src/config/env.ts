import { z } from "zod";



const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().url("Invalid Database URL"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters long"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
});

const PrasedEnv = envSchema.safeParse(process.env);

if (!PrasedEnv.success) {
  console.error("❌ Invalid environment variables:", PrasedEnv.error.format());
  process.exit(1);
}

export const EnvConfig = PrasedEnv.data;

