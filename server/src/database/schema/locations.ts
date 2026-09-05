import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

export const states = pgTable("states", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code"),
  status: text("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const districts = pgTable("districts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  stateId: text("state_id").notNull().references(() => states.id),
  lgdCode: text("lgd_code"),
  status: text("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  stateIdIdx: index("districts_state_id_idx").on(t.stateId),
}));

export const mandals = pgTable("mandals", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  districtId: text("district_id").notNull().references(() => districts.id),
  lgdCode: text("lgd_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  districtIdIdx: index("mandals_district_id_idx").on(t.districtId),
}));

export const villages = pgTable("villages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  districtId: text("district_id").notNull().references(() => districts.id),
  mandalId: text("mandal_id").notNull().references(() => mandals.id),
  lgdCode: text("lgd_code"),
  status: text("status"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  mandalIdIdx: index("villages_mandal_id_idx").on(t.mandalId),
  districtIdIdx: index("villages_district_id_idx").on(t.districtId),
  nameIdx: index("villages_name_idx").on(t.name),
}));
