import { defineConfig } from "drizzle-kit";




if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing in server/.env');
}
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/*",
  out: "./src/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
