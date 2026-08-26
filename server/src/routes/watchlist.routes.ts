import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateWatchlist } from "../middleware/validateWatchlist.js";
import {
  addToWatchlistController,
  getWatchlistController,
  removeFromWatchlistController,
} from "../controllers/watchlist.controller.js";

export const watchlistRouter = Router();

watchlistRouter.use(requireAuth);

watchlistRouter.post("/", validateWatchlist, addToWatchlistController);
watchlistRouter.get("/", getWatchlistController);
watchlistRouter.delete("/:imdbId", removeFromWatchlistController);
