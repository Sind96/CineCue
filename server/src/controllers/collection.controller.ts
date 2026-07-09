import type { Request, Response, NextFunction } from "express";
import { createCollection } from "../services/collection.service.js";
import { AppError } from "../utils/AppError.js";

export const createCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const collection = await createCollection(req.user.id, req.body);

    res.status(201).json({
      collection,
    });
  } catch (error) {
    next(error);
  }
};
