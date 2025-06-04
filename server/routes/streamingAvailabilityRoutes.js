import express from "express";
import {
  streamingAvailabilityGenreApi,
  streamingAvailabilityimdbIdApi,
} from "../controllers/streamingAvailabilityController.js";
const router = express.Router();

router.get("/stream/:genre", streamingAvailabilityGenreApi);
router.get("/streamimdbId/:imdbId", streamingAvailabilityimdbIdApi);

export default router;
