import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({
      message: "Invalid JSON body",
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: "Internal server error",
  });
};
