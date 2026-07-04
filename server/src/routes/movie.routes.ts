import { Router } from "express";
import {
  getGenresController,
  getMoviesByGenreController,
  getTopMoviesController,
} from "../controllers/movie.controller.js";

export const movieRouter = Router();

movieRouter.get("/top", getTopMoviesController);
movieRouter.get("/genres", getGenresController);
movieRouter.get("/genre/:genreId", getMoviesByGenreController);