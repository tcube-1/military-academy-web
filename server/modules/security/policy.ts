import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../config/ApiError";
import { HTTP_STATUS } from "../../config/httpStatus";
import { Permission } from "./permissions";

export enum PolicyDecision {
  ALLOW = "ALLOW",
  DENY = "DENY",
  REQUIRE_APPROVAL = "REQUIRE_APPROVAL",
  REQUIRE_REAUTH = "REQUIRE_REAUTH",
}

interface PolicyContext {
  actor: Express.Request["user"];
  action: Permission | string;
  resource?: any;
  scope?: string;
  risk?: string;
}

export class AcademyPolicyEngine {
  static evaluate(context: PolicyContext): PolicyDecision {
    if (!context.actor) return PolicyDecision.DENY;

    // Conceptual policy evaluation
    // If actor has the permission globally:
    if (context.actor.permissions?.includes(context.action)) {
      return PolicyDecision.ALLOW;
    }

    // Default deny
    return PolicyDecision.DENY;
  }
}

// Reusable Express middleware for authorization boundary
export const authorize = (action: Permission, resourceFactory?: (req: Request) => any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = resourceFactory ? resourceFactory(req) : undefined;
      
      const decision = AcademyPolicyEngine.evaluate({
        actor: req.user,
        action,
        resource,
      });

      switch (decision) {
        case PolicyDecision.ALLOW:
          return next();
        case PolicyDecision.REQUIRE_REAUTH:
          throw new ApiError("Re-authentication required", HTTP_STATUS.FORBIDDEN);
        case PolicyDecision.REQUIRE_APPROVAL:
          throw new ApiError("Approval required", HTTP_STATUS.FORBIDDEN);
        case PolicyDecision.DENY:
        default:
          throw new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN);
      }
    } catch (error) {
      next(error);
    }
  };
};
