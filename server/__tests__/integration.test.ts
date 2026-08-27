import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app";
import { db } from "../database/db";
import { sql } from "drizzle-orm";
import { env } from "../config/env";

describe("Real DB Integration Tests", () => {
  beforeAll(async () => {
    // Wait for DB to be responsive
    await db.execute(sqlSELECT 1);
  });

  it("should query states from actual DB", async () => {
    const res = await request(app).get("/api/v1/locations/states").set("x-mock-auth", "valid");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should query forces from actual DB", async () => {
    const res = await request(app).get("/api/v1/forces").set("x-mock-auth", "valid");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should query students from actual DB", async () => {
    const res = await request(app).get("/api/v1/students").set("x-mock-auth", "valid");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
