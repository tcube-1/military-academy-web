import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    displayName: z.string().min(2),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).default("ACTIVE"),
    roleIds: z.array(z.string().uuid()).optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    email: z.string().email().optional(),
    displayName: z.string().min(2).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
  }).strict(),
});

export const assignRoleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    roleId: z.string().uuid(),
  }),
});

export const removeRoleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
    roleId: z.string().uuid(),
  }),
});

export const getUserSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});
