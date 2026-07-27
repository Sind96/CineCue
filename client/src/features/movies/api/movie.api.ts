import { apiClient } from "../../../lib/apiClient";
import type { GenreGroup, Movie } from "../types/movie.types";

export const getTopMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get<Movie[]>("/top20");

  return response.data;
};

export const getMoviesByGenre = async (): Promise<GenreGroup[]> => {
  const response = await apiClient.get<GenreGroup[]>("/streamgenre");

  return response.data;
};
