import { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "../config/auth.config";
import { ApiError } from "../config/ApiError";
import { HTTP_STATUS } from "../config/httpStatus";

// Extend Request type to include authenticated user context
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

    if (!session || !session.user) {
      throw new ApiError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    // Authenticated User Resolution boundary
    // In future phases, query DB to load exact academy role and permissions
    req.user = {
      id: session.user.id || "system-id",
      email: session.user.email || "",
      role: "GUEST", // Stub
      permissions: [], // Stub
    };

    next();
  } catch (error) {
    next(error);
  }
};
