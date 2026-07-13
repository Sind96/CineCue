import type { Request, Response, NextFunction } from "express";
import {
  getGenres,
  getMovieByImdbId,
  getMoviesByGenre,
  getTopMovies,
  searchMovies,
} from "../services/movieApi.service.js";

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
    next(error);
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

export const getMoviesByGenreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { genreId } = req.params;

    const countryCode =
      typeof req.query.country === "string" ? req.query.country : "gb";

    const movies = await getMoviesByGenre(genreId, countryCode);

    res.status(200).json({
      movies,
    });
  } catch (error) {
    next(error);
  }
};

export const searchMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = typeof req.query.query === "string" ? req.query.query : "";

    const countryCode =
      typeof req.query.country === "string" ? req.query.country : "gb";

    const movies = await searchMovies(query, countryCode);

    res.status(200).json({
      movies,
    });
  } catch (error) {
    next(error);
  }
};

export const getMovieByImdbIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { imdbId } = req.params;

    const countryCode =
      typeof req.query.country === "string" ? req.query.country : "gb";

    const movie = await getMovieByImdbId(imdbId, countryCode);

    res.status(200).json({
      movie,
    });
  } catch (error) {
    next(error);
  }
};
