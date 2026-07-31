import { apiClient } from "../../../lib/apiClient";
import type {
  Genre,
  GenresResponse,
  Movie,
  MoviesResponse,
} from "../types/movie.types";

export const getTopMovies = async (): Promise<Movie[]> => {
  const { data } = await apiClient.get<MoviesResponse>("/movies/top");

  return data.movies;
};

export const getGenres = async (): Promise<Genre[]> => {
  const { data } = await apiClient.get<GenresResponse>("/movies/genres");

  return data.genres;
};
