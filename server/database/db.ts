import { drizzle } from "drizzle-orm/neon-http";

export const connectDb = drizzle(process.env.DATABASE_URL!);
