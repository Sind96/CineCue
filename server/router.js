import express from "express";
import {
  retrieveAllMovies,
  addMovie,
  removeMovie,
} from "./controllers/movies.js";
const router = express.Router();

router.get("/movielist", retrieveAllMovies);
router.post("/movie", addMovie);
router.delete("/movie", removeMovie);

export default router;
