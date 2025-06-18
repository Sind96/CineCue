import express from "express";
import {
  getMoviesByTitle,
  getAllMoviesByGenre,
  getMoviesByImdbId,
  getTop20IMDBMovies,
} from "../controllers/streamingAvailabilityController.js";
const router = express.Router();

router.post("/title", getMoviesByTitle);
router.get("/top20", getTop20IMDBMovies);
router.get("/streamgenre", getAllMoviesByGenre);
router.get("/streamimdbId/:imdbId", getMoviesByImdbId);

export default router;
