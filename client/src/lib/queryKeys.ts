export const queryKeys = {
  movies: {
    all: ["movies"] as const,
    homepage: ["movies", "homepage"] as const,
    detail: (imdbId?: string) => ["movies", "detail", imdbId] as const,
    genre: (genreId?: string) => ["movies", "genre", genreId] as const,
    search: (query: string) => ["movies", "search", query] as const,
  },
  watchlist: {
    all: ["watchlist"] as const,
  },
  collections: {
    all: ["collections"] as const,
    detail: (collectionId?: string) =>
      ["collections", "detail", collectionId] as const,
  },
};
