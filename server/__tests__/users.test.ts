import { describe, it, expect, vi, beforeEach } from "vitest";

// No need to mock auth here, using x-mock-auth header
import request from "supertest";
import { app } from "../app";
import { UsersRepository } from "../modules/users/users.repository";
import { RolesRepository } from "../modules/roles/roles.repository";
import { db } from "../database/db";

// Mock database interactions
vi.mock("../database/db", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}));

describe("Phase 5: Users, Roles, Permissions API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockDbSelect = (mockData: any) => {
    const fromFn = vi.fn().mockReturnValue({
      where: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue(mockData),
        innerJoin: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockData)
        })
      }),
      innerJoin: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(mockData)
      })
    });
    // This allows .where to be called immediately or after .from
    fromFn.where = vi.fn().mockResolvedValue(mockData);
    
    vi.mocked(db.select).mockReturnValue({
      from: fromFn,
    } as any);
  };

  const mockDbInsert = (mockData: any) => {
    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([mockData]),
        onConflictDoNothing: vi.fn().mockResolvedValue(undefined)
      })
    } as any);
  };
  
  const mockDbUpdate = (mockData: any) => {
    vi.mocked(db.update).mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockData])
        })
      })
    } as any);
  };

  it("1. should reject API access if unauthenticated", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(401);
  });

  it("2. should reject API access if authenticated but DB user not found", async () => {
    vi.spyOn(UsersRepository, "findByAuthId").mockResolvedValue(null);
    vi.spyOn(UsersRepository, "findAll").mockResolvedValue([] as any);
    const res = await request(app)
      .get("/api/v1/users")
      .set("x-mock-auth", "valid");
    expect(res.status).toBe(401);
  });

  it("3. should allow fetching users if authenticated and has USERS_READ permission", async () => {
    const dbUser = { id: "u1", email: "admin@test.com", status: "ACTIVE" };
    const dbRoles = [{ role: { id: "r1", name: "ADMIN" } }];
    const dbPerms = [{ permission: { name: "users.read" } }];
    const allUsers = [dbUser, { id: "u2", email: "test2@test.com", status: "ACTIVE" }];

    vi.spyOn(UsersRepository, "findByAuthId").mockResolvedValue(dbUser as any);
    vi.spyOn(UsersRepository, "getUserRoles").mockResolvedValue(dbRoles as any);
    vi.spyOn(RolesRepository, "getRolePermissions").mockResolvedValue(dbPerms as any);
    vi.spyOn(UsersRepository, "findAll").mockResolvedValue(allUsers as any);

    const res = await request(app)
      .get("/api/v1/users")
      .set("x-mock-auth", "valid");
    
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it("4. should reject fetching users if actor lacks USERS_READ permission", async () => {
    const dbUser = { id: "u1", email: "student@test.com", status: "ACTIVE" };
    const dbRoles = [{ role: { id: "r2", name: "STUDENT" } }];
    const dbPerms = [{ permission: { name: "students.read" } }]; // no users.read!

    vi.spyOn(UsersRepository, "findByAuthId").mockResolvedValue(dbUser as any);
    vi.spyOn(UsersRepository, "getUserRoles").mockResolvedValue(dbRoles as any);
    vi.spyOn(RolesRepository, "getRolePermissions").mockResolvedValue(dbPerms as any);

    const res = await request(app)
      .get("/api/v1/users")
      .set("x-mock-auth", "valid");
    
    expect(res.status).toBe(403);
  });

  it("5. should successfully create a user if actor has USERS_CREATE permission", async () => {
    const dbUser = { id: "u1", email: "admin@test.com", status: "ACTIVE" };
    const dbRoles = [{ role: { id: "r1", name: "ADMIN" } }];
    const dbPerms = [{ permission: { name: "users.create" } }]; // has permission

    vi.spyOn(UsersRepository, "findByAuthId").mockResolvedValue(dbUser as any);
    vi.spyOn(UsersRepository, "getUserRoles").mockResolvedValue(dbRoles as any);
    vi.spyOn(RolesRepository, "getRolePermissions").mockResolvedValue(dbPerms as any);
    
    const newUser = { id: "new-u", email: "new@test.com" };
    vi.spyOn(UsersRepository, "create").mockResolvedValue(newUser as any);

    const res = await request(app)
      .post("/api/v1/users")
      .set("x-mock-auth", "valid")
      .send({ email: "new@test.com", displayName: "New User" });
    
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe("new-u");
  });

  it("6. should assign a role if actor has ROLES_MANAGE permission", async () => {
    const dbUser = { id: "u1", email: "admin@test.com", status: "ACTIVE" };
    const dbRoles = [{ role: { id: "r1", name: "ADMIN" } }];
    const dbPerms = [{ permission: { name: "roles.manage" } }]; 

    vi.spyOn(UsersRepository, "findByAuthId").mockResolvedValue(dbUser as any);
    vi.spyOn(UsersRepository, "getUserRoles").mockResolvedValue(dbRoles as any);
    vi.spyOn(RolesRepository, "getRolePermissions").mockResolvedValue(dbPerms as any);
    vi.spyOn(UsersRepository, "assignRole").mockResolvedValue(undefined as any);

    const res = await request(app)
      .post("/api/v1/users/550e8400-e29b-41d4-a716-446655440000/roles")
      .set("x-mock-auth", "valid")
      .send({ roleId: "550e8400-e29b-41d4-a716-446655440001" });
    
    expect(res.status).toBe(200);
  });

  it("7. should fetch roles if actor has ROLES_READ permission", async () => {
    const dbUser = { id: "u1", email: "admin@test.com", status: "ACTIVE" };
    const dbRoles = [{ role: { id: "r1", name: "ADMIN" } }];
    const dbPerms = [{ permission: { name: "roles.read" } }]; 

    vi.spyOn(UsersRepository, "findByAuthId").mockResolvedValue(dbUser as any);
    vi.spyOn(UsersRepository, "getUserRoles").mockResolvedValue(dbRoles as any);
    vi.spyOn(RolesRepository, "getRolePermissions").mockResolvedValue(dbPerms as any);
    vi.spyOn(RolesRepository, "findAllRoles").mockResolvedValue([{ id: "r1", name: "ADMIN" }] as any);

    const res = await request(app)
      .get("/api/v1/roles")
      .set("x-mock-auth", "valid");
    
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });
});
