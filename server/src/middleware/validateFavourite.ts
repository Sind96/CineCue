import type { Request, Response, NextFunction } from "express";
import { favouriteSchema } from "../validators/favourite.validator.js";

export const validateFavourite = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = favouriteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0]?.message ?? "Invalid favourite data",
    });
    return;
  }

  req.body = result.data;
  next();
};
