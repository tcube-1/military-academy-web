import { pgTable, text, timestamp, uuid, pgEnum, integer, real, index } from "drizzle-orm/pg-core";
import { villages } from "./locations";
import { forces, serviceRoles } from "./forces";

export const bloodGroupEnum = pgEnum("blood_group", [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
]);

export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentCode: text("student_code").notNull().unique(),
  fullName: text("full_name").notNull(),
  slug: text("slug").notNull().unique(),
  avatarUrl: text("avatar_url"),
  mobile: text("mobile"),
  bloodGroup: bloodGroupEnum("blood_group"),
  forceId: uuid("force_id").references(() => forces.id),
  serviceRoleId: uuid("service_role_id").references(() => serviceRoles.id),
  joiningYear: integer("joining_year"),
  status: text("status").default("DRAFT").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
}, (t) => ({
  studentCodeIdx: index("students_student_code_idx").on(t.studentCode),
  slugIdx: index("students_slug_idx").on(t.slug),
  forceIdIdx: index("students_force_id_idx").on(t.forceId),
  serviceRoleIdIdx: index("students_service_role_id_idx").on(t.serviceRoleId),
  statusIdx: index("students_status_idx").on(t.status),
  createdAtIdx: index("students_created_at_idx").on(t.createdAt),
}));

export const studentAddresses = pgTable("student_addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").notNull().unique().references(() => students.id, { onDelete: "cascade" }),
  houseNo: text("house_no"),
  villageId: text("village_id").references(() => villages.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const studentEducation = pgTable("student_education", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
  qualification: text("qualification").notNull(),
  institution: text("institution").notNull(),
  passingYear: integer("passing_year"),
  percentage: real("percentage"),
  grade: text("grade"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const studentFamily = pgTable("student_family", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  relationType: text("relation_type").notNull(), // e.g., FATHER, MOTHER, GUARDIAN
  occupation: text("occupation"),
  contactNumber: text("contact_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
