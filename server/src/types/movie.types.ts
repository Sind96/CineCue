export type Genre = {
  id: string;
  name: string;
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

export type MovieSummary = {
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

export type GenreGroup = {
  genre: Genre;
  movies: MovieSummary[];
};

export type HomepageMoviesResponse = {
  topMovies: MovieSummary[];
  genreGroups: GenreGroup[];
};

export type StreamingApiGenre = {
  id: string;
  name: string;
};

export type StreamingApiShow = {
  id: string;
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  releaseYear?: number;
  genres?: StreamingApiGenre[];
  rating?: number;
  imageSet?: {
    verticalPoster?: {
      w480?: string;
      w600?: string;
    };
    horizontalBackdrop?: {
      w720?: string;
      w1080?: string;
    };
  };
  streamingOptions?: Record<
    string,
    {
      service: {
        id: string;
        name: string;
        imageSet?: {
          lightThemeImage?: string;
          darkThemeImage?: string;
          whiteImage?: string;
        };
      };
      type: string;
      link: string;
      price?: {
        formatted?: string;
      };
      expiresSoon?: boolean;
      expiresOn?: number;
      availableSince?: number;
    }[]
  >;
};
