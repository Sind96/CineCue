import type { Request, Response, NextFunction } from "express";
import {
  addMovieToCollection,
  createCollection,
  getCollections,
} from "../services/collection.service.js";
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

export const getCollectionsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const collections = await getCollections(req.user.id);

    res.status(200).json({
      collections,
    });
  } catch (error) {
    next(error);
  }
};

export const addMovieToCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const { collectionId } = req.params;

    const collectionMovie = await addMovieToCollection(
      req.user.id,
      collectionId,
      req.body,
    );

    res.status(201).json({
      collectionMovie,
    });
  } catch (error) {
    next(error);
  }
};
