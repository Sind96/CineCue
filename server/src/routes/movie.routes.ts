import { Router } from "express";
import {
  getGenresController,
  getMovieByImdbIdController,
  getMoviesByGenreController,
  getTopMoviesController,
  searchMoviesController,
} from "../controllers/movie.controller.js";

export const movieRouter = Router();

movieRouter.get("/top", getTopMoviesController);
movieRouter.get("/genres", getGenresController);
movieRouter.get("/genre/:genreId", getMoviesByGenreController);
movieRouter.get("/search", searchMoviesController);
movieRouter.get("/:imdbId", getMovieByImdbIdController);
