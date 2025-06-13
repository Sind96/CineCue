import express from "express";
import {
  getMoviesByTitle,
  getAllMoviesByGenre,
  getMoviesByImdbId,
} from "../controllers/streamingAvailabilityController.js";
const router = express.Router();

router.post("/title", getMoviesByTitle);
router.get("/streamgenre", getAllMoviesByGenre);
router.get("/streamimdbId/:imdbId", getMoviesByImdbId);

export default router;
