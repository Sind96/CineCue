import type { Request, Response, NextFunction } from "express";
import {
  addMovieToCollectionSchema,
  createCollectionSchema,
  updateCollectionSchema,
} from "../validators/collection.validator.js";

export const validateCreateCollection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = createCollectionSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0]?.message ?? "Invalid collection data",
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateAddMovieToCollection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = addMovieToCollectionSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0]?.message ?? "Invalid movie data",
    });
    return;
  }

  req.body = result.data;
  next();
};

export const validateUpdateCollection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updateCollectionSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0]?.message ?? "Invalid collection data",
    });
    return;
  }

  req.body = result.data;
  next();
};
