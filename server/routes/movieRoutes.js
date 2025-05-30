import express from "express";
import { apiMovieCall } from "../controllers/movieController.js";
const router = express.Router();

router.post("/call", apiMovieCall);

export default router;
