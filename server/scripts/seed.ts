import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../database/schema/index.js";
import { eq } from "drizzle-orm";
import { PERMISSIONS } from "../modules/security/permissions.js";
import { env } from "../config/env.js";

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

const ROLES = [
  { name: "SUPER_ADMIN", slug: "super-admin", description: "System Administrator" },
  { name: "ADMIN", slug: "admin", description: "Academy Administrator" },
  { name: "INSTRUCTOR", slug: "instructor", description: "Academic Instructor" },
  { name: "STAFF", slug: "staff", description: "Operational Staff" },
  { name: "VIEWER", slug: "viewer", description: "Read-only User" },
  { name: "STUDENT", slug: "student", description: "Academy Student" },
];

const seed = async () => {
  console.log("Starting DB Seed...");

  // Seed Permissions
  for (const [key, value] of Object.entries(PERMISSIONS)) {
    const resource = value.split(".")[0];
    const action = value.split(".")[1];
    
    await db.insert(schema.permissions).values({
      name: value,
      resource,
      action,
      description: `Can ${action} ${resource}`,
    }).onConflictDoNothing({ target: schema.permissions.name });
  }
  console.log("Permissions seeded.");

  // Seed Roles
  for (const r of ROLES) {
    await db.insert(schema.roles).values(r).onConflictDoNothing({ target: schema.roles.name });
  }
  console.log("Roles seeded.");

  // Map SUPER_ADMIN to all permissions
  const superAdminRole = await db.select().from(schema.roles).where(eq(schema.roles.name, "SUPER_ADMIN")).limit(1);
  const allPermissions = await db.select().from(schema.permissions);
  
  if (superAdminRole.length > 0) {
    for (const p of allPermissions) {
      await db.insert(schema.rolePermissions).values({
        roleId: superAdminRole[0].id,
        permissionId: p.id,
      }).onConflictDoNothing();
    }
    console.log("Mapped all permissions to SUPER_ADMIN.");
  }

  // Seed initial Admin User if EMAIL is provided in dev (Optional)
  if (process.env.SEED_ADMIN_EMAIL) {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    await db.insert(schema.users).values({
      email: adminEmail,
      displayName: "System Admin",
      status: "ACTIVE",
    }).onConflictDoNothing({ target: schema.users.email });

    const adminUser = await db.select().from(schema.users).where(eq(schema.users.email, adminEmail)).limit(1);
    if (adminUser.length > 0 && superAdminRole.length > 0) {
      await db.insert(schema.userRoles).values({
        userId: adminUser[0].id,
        roleId: superAdminRole[0].id,
      }).onConflictDoNothing();
      console.log(`Assigned SUPER_ADMIN to ${adminEmail}`);
    }
  }

  console.log("Seed completed.");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
