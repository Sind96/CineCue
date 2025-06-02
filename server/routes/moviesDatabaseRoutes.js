import express from "express";
import { apiMovieCall } from "../controllers/moviesDatabaseController.js";
const router = express.Router();

router.post("/call", apiMovieCall);

export default router;
