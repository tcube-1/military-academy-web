import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiError } from "../config/ApiError";
import { HTTP_STATUS } from "../config/httpStatus";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
        return next(new ApiError(errorMessage, HTTP_STATUS.BAD_REQUEST));
      }
      return next(error);
    }
  };
