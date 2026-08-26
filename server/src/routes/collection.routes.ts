import { Router } from "express";
import {
  addMovieToCollectionController,
  createCollectionController,
  deleteCollectionController,
  getCollectionController,
  getCollectionsController,
  removeMovieFromCollectionController,
  updateCollectionController,
} from "../controllers/collection.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  validateAddMovieToCollection,
  validateCreateCollection,
  validateUpdateCollection,
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
collectionRouter.patch(
  "/:collectionId",
  validateUpdateCollection,
  updateCollectionController,
);
collectionRouter.delete(
  "/:collectionId/movies/:imdbId",
  removeMovieFromCollectionController,
);
collectionRouter.delete("/:collectionId", deleteCollectionController);
