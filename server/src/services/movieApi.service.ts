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
import { getCachedValue, setCachedValue } from "../lib/cache.js";

let movieApiRequestCount = 0;

type StreamingApiSearchResponse = {
  shows: StreamingApiShow[];
};

type StreamingApiTitleSearchResponse = StreamingApiShow[];

const ONE_MINUTE = 1000 * 60;

const CACHE_TTL = {
  homepage: ONE_MINUTE * 60,
  topMovies: ONE_MINUTE * 60,
  genres: ONE_MINUTE * 60 * 24,
  genreMovies: ONE_MINUTE * 60,
  movieDetail: ONE_MINUTE * 60 * 6,
  search: ONE_MINUTE * 30,
} as const;

const logMovieApiDebug = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(message);
  }
};

const fetchFromMovieApi = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  if (process.env.NODE_ENV !== "production") {
    movieApiRequestCount += 1;

    logMovieApiDebug(`[Movie API] #${movieApiRequestCount} ${endpoint}`);
  }

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
  const cacheKey = `top:${countryCode}`;

  const cachedMovies = getCachedValue<MovieSummary[]>(cacheKey);

  if (cachedMovies) {
    logMovieApiDebug(`[Cache HIT] ${cacheKey}`);
    return cachedMovies;
  }

  logMovieApiDebug(`[Cache MISS] ${cacheKey}`);

  const data = await fetchFromMovieApi<StreamingApiSearchResponse>(
    `/shows/search/filters?country=${countryCode}&show_type=movie&order_by=rating`,
  );

  const movies = data.shows.map((show) => mapToMovieSummary(show, countryCode));

  setCachedValue(cacheKey, movies, CACHE_TTL.topMovies);

  return movies;
};

export const getGenres = async (): Promise<Genre[]> => {
  const cacheKey = "genres";

  const cachedGenres = getCachedValue<Genre[]>(cacheKey);

  if (cachedGenres) {
    logMovieApiDebug(`[Cache HIT] ${cacheKey}`);
    return cachedGenres;
  }

  logMovieApiDebug(`[Cache MISS] ${cacheKey}`);

  const data = await fetchFromMovieApi<StreamingApiGenre[]>("/genres");

  const genres = data.map(mapToGenre);

  setCachedValue(cacheKey, genres, CACHE_TTL.genres);

  return genres;
};

export const getMoviesByGenre = async (
  genreId: string,
  countryCode = "gb",
): Promise<MovieSummary[]> => {
  const cacheKey = `genre:${countryCode}:${genreId}`;

  const cachedMovies = getCachedValue<MovieSummary[]>(cacheKey);

  if (cachedMovies) {
    logMovieApiDebug(`[Cache HIT] ${cacheKey}`);
    return cachedMovies;
  }

  logMovieApiDebug(`[Cache MISS] ${cacheKey}`);

  const data = await fetchFromMovieApi<StreamingApiSearchResponse>(
    `/shows/search/filters?country=${countryCode}&show_type=movie&genres=${genreId}&order_by=rating`,
  );

  const movies = data.shows.map((show) => mapToMovieSummary(show, countryCode));

  setCachedValue(cacheKey, movies, CACHE_TTL.genreMovies);

  return movies;
};

export const searchMovies = async (
  query: string,
  countryCode = "gb",
): Promise<MovieSummary[]> => {
  const trimmedQuery = query.trim();
  const normalisedQuery = trimmedQuery.toLowerCase();
  const cacheKey = `search:${countryCode}:${normalisedQuery}`;

  const cachedMovies = getCachedValue<MovieSummary[]>(cacheKey);

  if (cachedMovies) {
    logMovieApiDebug(`[Cache HIT] ${cacheKey}`);
    return cachedMovies;
  }

  logMovieApiDebug(`[Cache MISS] ${cacheKey}`);

  const data = await fetchFromMovieApi<StreamingApiTitleSearchResponse>(
    `/shows/search/title?country=${countryCode}&title=${encodeURIComponent(trimmedQuery)}&show_type=movie`,
  );

  const movies = data.map((show) => mapToMovieSummary(show, countryCode));

  setCachedValue(cacheKey, movies, CACHE_TTL.search);

  return movies;
};

export const getMovieByImdbId = async (
  imdbId: string,
  countryCode = "gb",
): Promise<MovieSummary> => {
  const cacheKey = `movie:${countryCode}:${imdbId}`;

  const cachedMovie = getCachedValue<MovieSummary>(cacheKey);

  if (cachedMovie) {
    logMovieApiDebug(`[Cache HIT] ${cacheKey}`);
    return cachedMovie;
  }

  logMovieApiDebug(`[Cache MISS] ${cacheKey}`);

  const data = await fetchFromMovieApi<StreamingApiShow>(
    `/shows/${imdbId}?country=${countryCode}`,
  );

  const movie = mapToMovieSummary(data, countryCode);

  setCachedValue(cacheKey, movie, CACHE_TTL.movieDetail);

  return movie;
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
  const cacheKey = `homepage:${countryCode}`;

  const cachedHomepage = getCachedValue<HomepageMoviesResponse>(cacheKey);

  if (cachedHomepage) {
    logMovieApiDebug(`[Cache HIT] ${cacheKey}`);
    return cachedHomepage;
  }

  logMovieApiDebug(`[Cache MISS] ${cacheKey}`);

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

  const homepage = {
    topMovies: topMovies.slice(0, 20),
    genreGroups,
  };

  setCachedValue(cacheKey, homepage, CACHE_TTL.homepage);

  return homepage;
};
