import express from "express";
import {
  fetchAllMovies,
  addMovie,
  removeMovie,
} from "../controllers/movieController.js";
const router = express.Router();

router.get("/movielist", fetchAllMovies);
router.post("/movie", addMovie);
router.delete("/movie", removeMovie);

export default router;
