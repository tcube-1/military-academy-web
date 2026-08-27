import { pgTable, text, timestamp, uuid, unique } from "drizzle-orm/pg-core";

export const forces = pgTable("forces", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(), // renamed from forceId to code to avoid UUID confusion
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  status: text("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const serviceRoles = pgTable("service_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  forceId: uuid("force_id").notNull().references(() => forces.id),
  title: text("title").notNull(),
  category: text("category"),
  status: text("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  unq: unique().on(t.forceId, t.title)
}));
