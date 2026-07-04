import { Router } from "express";
import {
  getGenresController,
  getTopMoviesController,
} from "../controllers/movie.controller.js";

export const movieRouter = Router();

movieRouter.get("/top", getTopMoviesController);
movieRouter.get("/genres", getGenresController);
