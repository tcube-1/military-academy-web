import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  authUserId: text("auth_user_id").unique(), // Mapped to Auth.js provider identity
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  status: text("status").default("ACTIVE").notNull(), // ACTIVE, INACTIVE, SUSPENDED
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"), // Soft delete
});
