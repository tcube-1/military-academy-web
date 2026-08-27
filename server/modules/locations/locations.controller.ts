import { Request, Response } from "express";
import { db } from "../../database/db.js";
import { states, districts, mandals, villages } from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import { HTTP_STATUS } from "../../config/httpStatus.js";
import { asyncHandler } from "../../config/asyncHandler.js";

export class LocationsController {
  static getStates = asyncHandler(async (req: Request, res: Response) => {
    const data = await db.select().from(states);
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  static getDistricts = asyncHandler(async (req: Request, res: Response) => {
    const stateId = req.query.stateId as string;
    let query = db.select().from(districts);
    if (stateId && typeof stateId === "string") {
      query = query.where(eq(districts.stateId, stateId)) as any;
    }
    const data = await query;
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  static getMandals = asyncHandler(async (req: Request, res: Response) => {
    const districtId = req.query.districtId as string;
    let query = db.select().from(mandals);
    if (districtId && typeof districtId === "string") {
      query = query.where(eq(mandals.districtId, districtId)) as any;
    }
    const data = await query;
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  });

  static getVillages = asyncHandler(async (req: Request, res: Response) => {
    const mandalId = req.query.mandalId as string;
    let query = db.select().from(villages);
    if (mandalId && typeof mandalId === "string") {
      query = query.where(eq(villages.mandalId, mandalId)) as any;
    }
    const data = await query;
    res.status(HTTP_STATUS.OK).json({ success: true, data });
  });
}
