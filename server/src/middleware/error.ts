import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../config/httpStatus";
import { ApiError } from "../config/ApiError";
import { EnvConfig } from "../config/env";


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    error = new ApiError(message, statusCode, []);
  }

  const response = {
    success: false,
    error: {
      code: error.statusCode,
      message: error.message,
      requestId: req.headers["x-request-id"] || "unknown", // To be injected by correlation middleware
      ...(EnvConfig.NODE_ENV === "development" && { stack: err.stack }),
    }
  };

  res.status(error.statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError("Not Found", HTTP_STATUS.NOT_FOUND));
};
