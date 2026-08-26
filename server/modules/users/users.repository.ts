import { eq, isNull, and } from "drizzle-orm";
import { db } from "../../database/db.js";
import { users, userRoles, roles } from "../../database/schema/index.js";

export class UsersRepository {
  static async findAll() {
    return db.select().from(users).where(isNull(users.deletedAt));
  }

  static async findById(id: string) {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user[0] || null;
  }
  
  static async findByAuthId(authUserId: string) {
    const user = await db.select().from(users).where(eq(users.authUserId, authUserId)).limit(1);
    return user[0] || null;
  }

  static async create(data: { email: string; displayName: string; status?: string; authUserId?: string }) {
    const [user] = await db.insert(users).values({
      email: data.email,
      displayName: data.displayName,
      status: data.status || "ACTIVE",
      authUserId: data.authUserId,
    }).returning();
    return user;
  }

  static async update(id: string, data: Partial<typeof users.$inferInsert>) {
    const [user] = await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return user;
  }

  static async delete(id: string) {
    const [user] = await db.update(users).set({ deletedAt: new Date(), updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return user;
  }

  static async assignRole(userId: string, roleId: string, assignedBy?: string) {
    await db.insert(userRoles).values({ userId, roleId, assignedBy }).onConflictDoNothing();
  }

  static async removeRole(userId: string, roleId: string) {
    await db.delete(userRoles).where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)));
  }

  static async getUserRoles(userId: string) {
    return db
      .select({ role: roles })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, userId));
  }
}
