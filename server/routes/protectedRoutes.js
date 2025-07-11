import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addMovieToFavouriteList,
  fetchMoviesFromFavouriteList,
  removeMovieFromFavouriteList,
} from "../controllers/favouriteController.js";
const router = express.Router();

router.get("/watchlist", protect, fetchMoviesFromFavouriteList);
router.post("/watchlist", protect, addMovieToFavouriteList);
router.delete("/watchlist", protect, removeMovieFromFavouriteList);

export default router;