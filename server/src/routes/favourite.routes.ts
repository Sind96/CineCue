import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateFavourite } from "../middleware/validateFavourite.js";
import {
  addFavouriteController,
  deleteFavouriteController,
  getFavouritesController,
} from "../controllers/favourite.controller.js";

export const favouriteRouter = Router();

favouriteRouter.use(requireAuth);

favouriteRouter.post("/", validateFavourite, addFavouriteController);
favouriteRouter.get("/", getFavouritesController);
favouriteRouter.delete("/:imdbId", deleteFavouriteController);
