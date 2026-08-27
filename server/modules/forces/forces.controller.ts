import { Request, Response } from "express";
import { db } from "../../database/db.js";
import { forces, serviceRoles } from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import { HTTP_STATUS } from "../../config/httpStatus.js";
import { asyncHandler } from "../../config/asyncHandler.js";
import { ApiError } from "../../config/ApiError.js";

export class ForcesController {
  static getForces = asyncHandler(async (req: Request, res: Response) => {
    const data = await db.select().from(forces);
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  static getForce = asyncHandler(async (req: Request, res: Response) => {
    const data = await db.select().from(forces).where(eq(forces.id, req.params.id as string)).limit(1);
    if (!data.length) throw new ApiError("Force not found", HTTP_STATUS.NOT_FOUND);
    res.status(HTTP_STATUS.OK).json({ success: true, data: data[0] });
  });

  static getForceRoles = asyncHandler(async (req: Request, res: Response) => {
    const forceId = req.params.forceId as string;
    const data = await db.select().from(serviceRoles).where(eq(serviceRoles.forceId, forceId));
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  });
}
