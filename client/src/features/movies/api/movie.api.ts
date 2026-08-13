import { apiClient } from "../../../lib/apiClient";
import { mockMovies } from "../mocks/movie.mock";
import type { Genre, Movie, HomepageMovies } from "../types/movie.types";

const useMockMovies = import.meta.env.VITE_USE_MOCK_MOVIES === "true";

export const getTopMovies = async (): Promise<Movie[]> => {
  if (useMockMovies) {
    return mockMovies;
  }

  const { data } = await apiClient.get("/movies/top");
  return data.movies;
};

export const getGenres = async (): Promise<Genre[]> => {
  if (useMockMovies) {
    const genres = mockMovies.flatMap((movie) => movie.genres);

    return Array.from(
      new Map(genres.map((genre) => [genre.id, genre])).values(),
    );
  }

  const { data } = await apiClient.get("/movies/genres");
  return data.genres;
};

export const getMovieByImdbId = async (imdbId: string): Promise<Movie> => {
  if (useMockMovies) {
    const movie = mockMovies.find((mockMovie) => mockMovie.imdbId === imdbId);

    if (!movie) {
      throw new Error("Mock movie not found");
    }

    return movie;
  }

  const { data } = await apiClient.get(`/movies/${imdbId}`);
  return data.movie;
};

export const getHomepageMovies = async (): Promise<HomepageMovies> => {
  if (useMockMovies) {
    const genres = await getGenres();

    return {
      topMovies: mockMovies,
      genreGroups: genres.map((genre) => ({
        genre,
        movies: mockMovies.filter((movie) =>
          movie.genres.some((movieGenre) => movieGenre.id === genre.id),
        ),
      })),
    };
  }

  const { data } = await apiClient.get("/movies/home");
  return data.homepage;
};

export const getMoviesByGenre = async (genreId: string): Promise<Movie[]> => {
  if (useMockMovies) {
    return mockMovies.filter((movie) =>
      movie.genres.some((genre) => genre.id === genreId),
    );
  }

  const { data } = await apiClient.get(`/movies/genre/${genreId}`);

  return data.movies;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (useMockMovies) {
    const normalisedQuery = query.trim().toLowerCase();

    return mockMovies.filter((movie) =>
      movie.title.toLowerCase().includes(normalisedQuery),
    );
  }

  const { data } = await apiClient.get("/movies/search", {
    params: {
      query,
    },
  });

  return data.movies;
};
