import express from "express";
import {
  streamingAvailabilityGenreApi,
  streamingAvailabilityimdbIdApi,
  streamingAvailabilityTitleApi,
} from "../controllers/streamingAvailabilityController.js";
const router = express.Router();

router.post("/stream/title", streamingAvailabilityTitleApi);
router.get("/streamgenre/:genre", streamingAvailabilityGenreApi);
router.get("/streamimdbId/:imdbId", streamingAvailabilityimdbIdApi);

export default router;
