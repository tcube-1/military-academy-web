import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../app";
import { ApiError } from "../config/ApiError";
import { HTTP_STATUS } from "../config/httpStatus";
import { AcademyPolicyEngine, PolicyDecision, authorize } from "../modules/security/policy";
import { PERMISSIONS } from "../modules/security/permissions";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { AuditService } from "../modules/audit/audit.service";
import { z } from "zod";
import express from "express";
import { db } from "../database/db";

// Mock database to prevent actual connections during foundation tests
vi.mock("../database/db", () => ({
  db: {
    execute: vi.fn().mockResolvedValue([]),
  },
}));

describe("Foundation Architecture Tests", () => {
  it("1. should return 200 on GET /api/v1/health", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("OK");
  });

  it("2. should return 200 on GET /api/v1/ready when DB is connected", async () => {
    const res = await request(app).get("/api/v1/ready");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("READY");
    expect(res.body.data.database).toBe("connected");
  });

  it("3. should return 503 on GET /api/v1/ready when DB query fails", async () => {
    vi.mocked(db.execute).mockRejectedValueOnce(new Error("Connection refused"));
    const res = await request(app).get("/api/v1/ready");
    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("SERVICE_UNAVAILABLE");
  });

  it("4. should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/v1/unknown-route");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe(404);
  });

  it("5. should generate or pass through Request Correlation ID", async () => {
    const res = await request(app).get("/api/v1/health").set("x-request-id", "test-corr-id-123");
    expect(res.headers["x-request-id"]).toBe("test-corr-id-123");
  });

  it("6. should validate request payload using Zod validation middleware", async () => {
    const testApp = express();
    testApp.use(express.json());
    const schema = z.object({
      body: z.object({
        email: z.string().email(),
      }),
    });
    testApp.post("/test-validate", validate(schema), (req, res) => {
      res.status(200).json({ success: true });
    });
    testApp.use((err: any, req: any, res: any, next: any) => {
      res.status(err.statusCode || 500).json({ error: err.message });
    });

    const invalidRes = await request(testApp).post("/test-validate").send({ email: "invalid-email" });
    expect(invalidRes.status).toBe(400);

    const validRes = await request(testApp).post("/test-validate").send({ email: "user@test.com" });
    expect(validRes.status).toBe(200);
  });

  it("7. should evaluate ALLOW for actor with correct permission in PolicyEngine", () => {
    const decision = AcademyPolicyEngine.evaluate({
      actor: { id: "1", role: "ADMIN", email: "admin@test", permissions: [PERMISSIONS.STUDENTS_READ] },
      action: PERMISSIONS.STUDENTS_READ,
    });
    expect(decision).toBe(PolicyDecision.ALLOW);
  });

  it("8. should evaluate DENY for actor without permission in PolicyEngine", () => {
    const decision = AcademyPolicyEngine.evaluate({
      actor: { id: "1", role: "STUDENT", email: "student@test", permissions: [] },
      action: PERMISSIONS.STUDENTS_READ,
    });
    expect(decision).toBe(PolicyDecision.DENY);
  });

  it("9. should evaluate DENY for unauthenticated actor in PolicyEngine", () => {
    const decision = AcademyPolicyEngine.evaluate({
      actor: undefined,
      action: PERMISSIONS.STUDENTS_READ,
    });
    expect(decision).toBe(PolicyDecision.DENY);
  });

  it("10. should reject unauthenticated requests with requireAuth middleware", async () => {
    const testApp = express();
    testApp.get("/protected", requireAuth, (req, res) => res.json({ ok: true }));
    testApp.use((err: any, req: any, res: any, next: any) => {
      res.status(err.statusCode || 500).json({ error: err.message });
    });

    const res = await request(testApp).get("/protected");
    expect(res.status).toBe(401);
  });

  it("11. should log audit events correctly", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await AuditService.logEvent({
      actorId: "actor-1",
      action: "USER_LOGIN",
      resourceType: "auth",
      requestId: "req-1",
    });
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[AUDIT] USER_LOGIN on auth by actor-1"));
    consoleSpy.mockRestore();
  });
});
