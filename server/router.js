import express from "express";
import {
  retrieveAllMovies,
  addMovie,
  removeMovie,
} from "./controllers/movies.js";
const router = express.Router();

router.get("/", retrieveAllMovies);
router.post("/", addMovie);
router.delete("/", removeMovie);

export default router;
