import { Router } from "express";
import {
  addMovieToCollectionController,
  createCollectionController,
  getCollectionController,
  getCollectionsController,
  removeMovieFromCollectionController,
} from "../controllers/collection.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  validateAddMovieToCollection,
  validateCreateCollection,
} from "../middleware/validateCollection.js";

export const collectionRouter = Router();

collectionRouter.use(requireAuth);

collectionRouter.get("/", getCollectionsController);
collectionRouter.post(
  "/",
  validateCreateCollection,
  createCollectionController,
);
collectionRouter.post(
  "/:collectionId/movies",
  validateAddMovieToCollection,
  addMovieToCollectionController,
);
collectionRouter.get("/:collectionId", getCollectionController);
collectionRouter.delete(
  "/:collectionId/movies/:imdbId",
  removeMovieFromCollectionController,
);
