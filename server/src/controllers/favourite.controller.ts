import type { Request, Response, NextFunction } from "express";
import {
  addFavourite,
  deleteFavourite,
  getFavourites,
} from "../services/favourite.service.js";
import { AppError } from "../utils/AppError.js";

export const addFavouriteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const favourite = await addFavourite(req.user.id, req.body);

    res.status(201).json({
      favourite,
    });
  } catch (error) {
    next(error);
  }
};

export const getFavouritesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const favourites = await getFavourites(req.user.id);

    res.status(200).json({
      favourites,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFavouriteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const { imdbId } = req.params;

    await deleteFavourite(req.user.id, imdbId);

    res.status(200).json({
      message: "Movie removed from favourites",
    });
  } catch (error) {
    next(error);
  }
};
