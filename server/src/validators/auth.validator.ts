import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const validateRegister = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string") {
    throw new AppError(400, "Name is required");
  }

  if (!email || typeof email !== "string") {
    throw new AppError(400, "Valid email is required");
  }

  if (!email.includes("@")) {
    throw new AppError(400, "Valid email is required");
  }

  if (!password || typeof password !== "string") {
    throw new AppError(400, "Password is required");
  }

  if (password.length < 8) {
    throw new AppError(400, "Password must be at least 8 characters");
  }

  next();
};
