export type Genre = {
  id: string;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};

export type StreamingProvider = {
  id: string;
  name: string;
  type: string;
  link: string;
  logoUrl?: string;
  price?: string;
  expiresSoon: boolean;
  expiresOn?: number;
  availableSince?: number;
};

export type Movie = {
  externalId: string;
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  releaseYear: number;
  genres: Genre[];
  rating: number;
  posterUrl?: string;
  backdropUrl?: string;
  streamingProviders: StreamingProvider[];
};

export type MoviesResponse = {
  movies: Movie[];
};

export type MovieResponse = {
  movie: Movie;
};
