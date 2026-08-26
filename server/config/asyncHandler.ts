import type { Request, Response, NextFunction } from "express";
import { promise } from "zod";

type asyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

const asyncHandler = (fn: asyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
