import { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "../config/auth.config.js";
import { ApiError } from "../config/ApiError.js";
import { HTTP_STATUS } from "../config/httpStatus.js";
import { UsersRepository } from "../modules/users/users.repository.js";
import { RolesRepository } from "../modules/roles/roles.repository.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        permissions: string[];
      };
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await getSession(req, authConfig);

    // Test environment bypass
    if (process.env.NODE_ENV === "test" && req.headers["x-mock-auth"] === "valid") {
      req.user = {
        id: "auth-id-123",
        email: "admin@test.com",
        role: "ADMIN",
        permissions: [] // permissions injected in tests by mocking RolesRepository
      };
      // We still need to run the rest of the DB resolution for tests!
      // So instead of returning next(), we just mock the session object:
      const mockSession = { user: { id: "auth-id-123", email: "admin@test.com" } };
      
      if (!mockSession.user) throw new ApiError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    } else if (!session || !session.user || !session.user.email) {
      throw new ApiError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const authId = process.env.NODE_ENV === "test" && req.headers["x-mock-auth"] === "valid" 
      ? "auth-id-123" 
      : (session?.user?.id || session?.user?.email);

    // Authenticated User Resolution boundary
    let user = await UsersRepository.findByAuthId(authId as string);
    
    if (!user) {
      // Fallback lookup by email if authUserId is not perfectly mapped yet
      const users = await UsersRepository.findAll();
      user = users.find(u => u.email === session.user?.email) || null;
    }

    if (!user || user.status !== "ACTIVE" || user.deletedAt) {
      throw new ApiError("Unauthorized or Account Inactive", HTTP_STATUS.UNAUTHORIZED);
    }

    // Resolve roles and permissions
    const userRoles = await UsersRepository.getUserRoles(user.id);
    const resolvedPermissions = new Set<string>();
    
    for (const ur of userRoles) {
      const perms = await RolesRepository.getRolePermissions(ur.role.id);
      for (const p of perms) {
        resolvedPermissions.add(p.permission.name);
      }
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: userRoles.length > 0 ? userRoles[0].role.name : "VIEWER", // Simple string mapping for backward compat
      permissions: Array.from(resolvedPermissions),
    };

    next();
  } catch (error) {
    console.error("Auth error:", error); next(error);
  }
};
