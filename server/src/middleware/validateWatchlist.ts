import type { Request, Response, NextFunction } from "express";
import { watchlistSchema } from "../validators/watchlist.validator.js";

export const validateWatchlist = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = watchlistSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0]?.message ?? "Invalid watchlist data",
    });
    return;
  }

  req.body = result.data;
  next();
};
