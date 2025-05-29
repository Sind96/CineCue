import express from "express";
import {
  fetchMoviesFromFavouriteList,
  addMovieToFavouriteList,
  removeMovieFromFavouriteList,
} from "../controllers/favouriteController.js";
const router = express.Router();

router.get("/favouriteMovieList", fetchMoviesFromFavouriteList);
router.post("/addMovie", addMovieToFavouriteList);
router.delete("/removeMovie", removeMovieFromFavouriteList);

export default router;
