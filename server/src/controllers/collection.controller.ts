import type { Request, Response, NextFunction } from "express";
import {
  addMovieToCollection,
  createCollection,
  deleteCollection,
  getCollection,
  getCollections,
  removeMovieFromCollection,
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

export const getCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const { collectionId } = req.params;

    const collection = await getCollection(req.user.id, collectionId);

    res.status(200).json({
      collection,
    });
  } catch (error) {
    next(error);
  }
};

export const removeMovieFromCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const { collectionId, imdbId } = req.params;

    await removeMovieFromCollection(req.user.id, collectionId, imdbId);

    res.status(200).json({
      message: "Movie removed from collection",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError(401, "Authentication required");
    }

    const { collectionId } = req.params;

    await deleteCollection(req.user.id, collectionId);

    res.status(200).json({
      message: "Collection deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
