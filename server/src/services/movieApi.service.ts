import { env } from "../config/env.js";
import type {
  Genre,
  StreamingApiGenre,
  MovieSummary,
  StreamingApiShow,
} from "../types/movie.types.js";
import { mapToGenre } from "../utils/genre.mapper.js";
import { mapToMovieSummary } from "../utils/movie.mapper.js";

type StreamingApiSearchResponse = {
  shows: StreamingApiShow[];
};

const fetchFromMovieApi = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${env.MOVIE_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "X-RapidAPI-Key": env.MOVIE_API_KEY,
      "X-RapidAPI-Host": env.MOVIE_API_HOST,
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Movie API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getTopMovies = async (
  countryCode = "gb",
): Promise<MovieSummary[]> => {
  const data = await fetchFromMovieApi<StreamingApiSearchResponse>(
    `/shows/search/filters?country=${countryCode}&show_type=movie&order_by=rating`,
  );

  return data.shows.map((show) => mapToMovieSummary(show, countryCode));
};

export const getGenres = async (): Promise<Genre[]> => {
  const data = await fetchFromMovieApi<StreamingApiGenre[]>("/genres");

  return data.map(mapToGenre);
};
