import type { Request, Response, NextFunction } from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../services/watchlist.service.js";
import { AppError } from "../utils/AppError.js";

export const addToWatchlistController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const watchlistItem = await addToWatchlist(req.user.id, req.body);

    res.status(201).json({
      watchlistItem,
    });
  } catch (error) {
    next(error);
  }
};

export const getWatchlistController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const watchlist = await getWatchlist(req.user.id);

    res.status(200).json({
      watchlist,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWatchlistController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const { imdbId } = req.params;

    await removeFromWatchlist(req.user.id, imdbId);

    res.status(200).json({
      message: "Movie removed from watchlist",
    });
  } catch (error) {
    next(error);
  }
};
