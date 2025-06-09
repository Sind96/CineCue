import express from "express";
import {
  getMoviesByTitle,
  getMoviesByGenre,
  getMoviesByImdbId,
} from "../controllers/streamingAvailabilityController.js";
const router = express.Router();

router.post("/title", getMoviesByTitle);
router.get("/streamgenre/:genre", getMoviesByGenre);
router.get("/streamimdbId/:imdbId", getMoviesByImdbId);

export default router;
