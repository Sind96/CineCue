import type { Request, Response, NextFunction } from "express";
import { getGenres, getTopMovies } from "../services/movieApi.service.js";

export const getTopMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const countryCode =
      typeof req.query.country === "string" ? req.query.country : "gb";

    const movies = await getTopMovies(countryCode);

    res.status(200).json({
      movies,
    });
  } catch (error) {
    console.error(next);
  }
};

export const getGenresController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const genres = await getGenres();

    res.status(200).json({
      genres,
    });
  } catch (error) {
    next(error);
  }
};
