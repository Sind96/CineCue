import type { Genre } from "../../../@types/streamingAvailability/genres.type";
import type { ImageSet } from "../../../@types/streamingAvailability/imageSets.type";
import type { StreamingOption } from "../../../@types/streamingAvailability/streamingOptions.types";

export type Movie = {
  itemType: string;
  showType: string;
  id: string;
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  releaseYear: number;
  originalTitle: string;
  genres: Genre[];
  directors: string[];
  cast: string[];
  rating: number;
  runtime: number;
  imageSet: ImageSet;
  streamingOptions: Record<string, StreamingOption[]>;
};

export type GenreGroup = {
  genre: string;
  movies: Movie[];
};
