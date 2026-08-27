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
    limit: vi.fn().mockResolvedValue([]),
    execute: vi.fn(),
  };
  // Handle async return for direct from/where resolutions
  mDb.from.mockImplementation(() => {
    const chain: any = Promise.resolve([{ id: "test_id", name: "test_name" }]);
    chain.where = vi.fn().mockReturnValue(chain);
    chain.limit = vi.fn().mockReturnValue(chain);
    return chain;
  });
  return { db: mDb };
});

describe("Location APIs", () => {
  it("should fetch states", async () => {
    const res = await request(app).get("/api/v1/locations/states");
    expect(res.status).toBe(200);
  });
  it("should fetch districts", async () => {
    const res = await request(app).get("/api/v1/locations/districts?stateId=telangana");
    expect(res.status).toBe(200);
  });
  it("should fetch mandals", async () => {
    const res = await request(app).get("/api/v1/locations/mandals?districtId=1");
    expect(res.status).toBe(200);
  });
  it("should fetch villages", async () => {
    const res = await request(app).get("/api/v1/locations/villages?mandalId=1");
    expect(res.status).toBe(200);
  });
});
