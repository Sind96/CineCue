import express from "express";
import {
  fetchMoviesFromFavouriteList,
  addMovieToFavouriteList,
  removeMovieFromFavouriteList,
} from "../controllers/favouriteController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/MovieList", protect, fetchMoviesFromFavouriteList);
router.post("/addMovie", protect, addMovieToFavouriteList);
router.delete("/removeMovie", protect, removeMovieFromFavouriteList);

export default router;
