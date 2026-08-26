import { eq } from "drizzle-orm";
import { db } from "../../database/db.js";
import { roles, permissions, rolePermissions } from "../../database/schema/index.js";

export class RolesRepository {
  static async findAllRoles() {
    return db.select().from(roles);
  }

  static async findRoleById(id: string) {
    const role = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
    return role[0] || null;
  }

  static async findRoleBySlug(slug: string) {
    const role = await db.select().from(roles).where(eq(roles.slug, slug)).limit(1);
    return role[0] || null;
  }

  static async getRolePermissions(roleId: string) {
    return db
      .select({ permission: permissions })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(eq(rolePermissions.roleId, roleId));
  }

  static async findAllPermissions() {
    return db.select().from(permissions);
  }
}
