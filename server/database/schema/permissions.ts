import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(), // e.g., 'students.read'
  resource: text("resource").notNull(), // e.g., 'students'
  action: text("action").notNull(), // e.g., 'read'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
