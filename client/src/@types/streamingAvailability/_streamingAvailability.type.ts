import type { Genre } from "./genres.type";
import type { ImageSet } from "./imageSets.type";
import type { StreamingOption } from "./streamingOptions.types";

export interface streamingAvailabilityProps {
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
}

export interface GenreGroup {
  genre: string;
  movies: streamingAvailabilityProps[];
}
