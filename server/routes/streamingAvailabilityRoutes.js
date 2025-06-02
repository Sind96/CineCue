import express from "express";
import { streamingAvailabilityApi } from "../controllers/streamingAvailabilityController.js";
const router = express.Router();

router.get("/stream/:genre", streamingAvailabilityApi);

export default router;
