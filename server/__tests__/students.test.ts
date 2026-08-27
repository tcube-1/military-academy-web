import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../app";
import { db } from "../database/db";

vi.mock("../middleware/auth", () => ({
  requireAuth: vi.fn((req, res, next) => {
    req.user = { id: "test", email: "test@test.com", role: "ADMIN", permissions: ["students.read"] };
    next();
  }),
}));

vi.mock("../database/db", () => {
  const mDb = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
  };
  mDb.from.mockImplementation(() => {
    const chain: any = Promise.resolve([
      { id: "550e8400-e29b-41d4-a716-446655440000", studentCode: "TJC001", bloodGroup: "B+", slug: "test-slug" }
    ]);
    chain.where = vi.fn().mockReturnValue(chain);
    chain.limit = vi.fn().mockReturnValue(chain);
    return chain;
  });
  return { db: mDb };
});

describe("Students and Forces APIs", () => {
  it("should fetch forces", async () => {
    const res = await request(app).get("/api/v1/forces");
    expect(res.status).toBe(200);
  });
  it("should fetch single force", async () => {
    const res = await request(app).get("/api/v1/forces/123");
    expect(res.status).toBe(200);
  });
  it("should fetch force roles", async () => {
    const res = await request(app).get("/api/v1/forces/123/roles");
    expect(res.status).toBe(200);
  });
  it("should fetch students list", async () => {
    const res = await request(app).get("/api/v1/students");
    expect(res.status).toBe(200);
  });
  it("should fetch single student with relations", async () => {
    const res = await request(app).get("/api/v1/students/550e8400-e29b-41d4-a716-446655440000");
    expect(res.status).toBe(200);
    expect(res.body.data.studentCode).toBe("TJC001");
    expect(res.body.data.bloodGroup).toBe("B+");
  });
  it("should validate UUID format for student ID", async () => {
    const res = await request(app).get("/api/v1/students/invalid-uuid-string");
    expect(res.status).toBe(400); // Bad Request
  });
});
