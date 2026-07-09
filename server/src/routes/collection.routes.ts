import { Router } from "express";
import {
  createCollectionController,
  getCollectionsController,
} from "../controllers/collection.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateCreateCollection } from "../middleware/validateCollection.js";

export const collectionRouter = Router();

collectionRouter.use(requireAuth);

collectionRouter.post(
  "/",
  validateCreateCollection,
  createCollectionController,
);

collectionRouter.get("/", getCollectionsController);
