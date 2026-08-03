import { env } from "../config/env.js";
import type {
  Genre,
  GenreGroup,
  HomepageMoviesResponse,
  StreamingApiGenre,
  MovieSummary,
  StreamingApiShow,
} from "../types/movie.types.js";
import { mapToGenre } from "../utils/genre.mapper.js";
import { mapToMovieSummary } from "../utils/movie.mapper.js";

type StreamingApiSearchResponse = {
  shows: StreamingApiShow[];
};

type StreamingApiTitleSearchResponse = StreamingApiShow[];

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

export const getMoviesByGenre = async (
  genreId: string,
  countryCode = "gb",
): Promise<MovieSummary[]> => {
  const data = await fetchFromMovieApi<StreamingApiSearchResponse>(
    `/shows/search/filters?country=${countryCode}&show_type=movie&genres=${genreId}&order_by=rating`,
  );

  return data.shows.map((show) => mapToMovieSummary(show, countryCode));
};

export const searchMovies = async (
  query: string,
  countryCode = "gb",
): Promise<MovieSummary[]> => {
  const data = await fetchFromMovieApi<StreamingApiTitleSearchResponse>(
    `/shows/search/title?country=${countryCode}&title=${encodeURIComponent(query)}&show_type=movie`,
  );

  return data.map((show) => mapToMovieSummary(show, countryCode));
};

export const getMovieByImdbId = async (
  imdbId: string,
  countryCode = "gb",
): Promise<MovieSummary> => {
  const data = await fetchFromMovieApi<StreamingApiShow>(
    `/shows/${imdbId}?country=${countryCode}`,
  );

  return mapToMovieSummary(data, countryCode);
};

const HOMEPAGE_GENRE_IDS = [
  "action",
  "comedy",
  "drama",
  "crime",
  "thriller",
] as const;

export const getHomepageMovies = async (
  countryCode = "gb",
): Promise<HomepageMoviesResponse> => {
  const [topMovies, genres] = await Promise.all([
    getTopMovies(countryCode),
    getGenres(),
  ]);

  const homepageGenres = genres.filter((genre) =>
    HOMEPAGE_GENRE_IDS.includes(
      genre.id as (typeof HOMEPAGE_GENRE_IDS)[number],
    ),
  );

  const genreGroups: GenreGroup[] = await Promise.all(
    homepageGenres.map(async (genre) => {
      const movies = await getMoviesByGenre(genre.id, countryCode);

      return {
        genre,
        movies: movies.slice(0, 20),
      };
    }),
  );

  return {
    topMovies: topMovies.slice(0, 20),
    genreGroups,
  };
};
