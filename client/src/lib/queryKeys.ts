export const queryKeys = {
  movies: {
    all: ["movies"] as const,
    homepage: ["movies", "homepage"] as const,
    detail: (imdbId?: string) => ["movies", "detail", imdbId] as const,
    genre: (genreId?: string) => ["movies", "genre", genreId] as const,
  },
  watchlist: {
    all: ["watchlist"] as const,
  },
};
