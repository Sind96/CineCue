import express from "express";
import { apiMoviesDatabase } from "../controllers/moviesDatabaseController.js";
const router = express.Router();

router.post("/call", apiMoviesDatabase);

export default router;
