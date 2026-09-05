import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(), // e.g., 'SUPER_ADMIN'
  slug: text("slug").notNull().unique(), // e.g., 'super-admin'
  description: text("description"),
  status: text("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
