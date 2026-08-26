import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../app";
import { ApiError } from "../config/ApiError";
import { HTTP_STATUS } from "../config/httpStatus";
import { AcademyPolicyEngine, PolicyDecision } from "../modules/security/policy";

// Mock database to prevent actual connections during foundation tests
vi.mock("../database/db", () => ({
  db: {
    execute: vi.fn().mockResolvedValue([]),
  },
}));

describe("Foundation Architecture Tests", () => {
  it("should return 200 on /api/v1/health", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("OK");
  });

  it("should return 200 on /api/v1/ready when DB is mocked successfully", async () => {
    const res = await request(app).get("/api/v1/ready");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/v1/unknown-route");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe(404);
  });

  it("should generate a Request ID", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.headers["x-request-id"]).toBeDefined();
  });

  it("should evaluate ALLOW for actor with correct permission", () => {
    const decision = AcademyPolicyEngine.evaluate({
      actor: { id: "1", role: "ADMIN", email: "admin@test", permissions: ["students.read"] },
      action: "students.read",
    });
    expect(decision).toBe(PolicyDecision.ALLOW);
  });

  it("should evaluate DENY for actor without permission", () => {
    const decision = AcademyPolicyEngine.evaluate({
      actor: { id: "1", role: "STUDENT", email: "student@test", permissions: [] },
      action: "students.read",
    });
    expect(decision).toBe(PolicyDecision.DENY);
  });
});
