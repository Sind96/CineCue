import { apiClient } from "../../../lib/apiClient";
import type {
  Genre,
  GenresResponse,
  Movie,
  MoviesResponse,
  MovieResponse,
  HomepageMovies,
  HomepageMoviesResponse,
} from "../types/movie.types";

export const getTopMovies = async (): Promise<Movie[]> => {
  const { data } = await apiClient.get<MoviesResponse>("/movies/top");

  return data.movies;
};

export const getGenres = async (): Promise<Genre[]> => {
  const { data } = await apiClient.get<GenresResponse>("/movies/genres");

  return data.genres;
};

export const getMovieByImdbId = async (imdbId: string): Promise<Movie> => {
  const { data } = await apiClient.get<MovieResponse>(`/movies/${imdbId}`);

  return data.movie;
};

export const getHomepageMovies = async (): Promise<HomepageMovies> => {
  const { data } = await apiClient.get<HomepageMoviesResponse>("/movies/home");

  return data.homepage;
};
