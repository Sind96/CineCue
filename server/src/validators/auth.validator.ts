import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../utils/AppError.js";

export const registerSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .trim()
    .min(1, "Name is required")
    .max(100),
  email: z
    .string({
      error: "Email is required",
    })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Valid email is required" })),
  password: z
    .string({
      error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const validateRegister = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError(
      400,
      result.error.issues[0]?.message ?? "Invalid request",
    );
  }

  req.body = result.data;

  next();
};

export const loginSchema = z.object({
  email: z
    .string({
      error: "Email is required",
    })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Valid email is required" })),
  password: z.string({
    error: "Password is required",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const validateLogin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError(
      400,
      result.error.issues[0]?.message ?? "Invalid request",
    );
  }

  req.body = result.data;

  next();
};
