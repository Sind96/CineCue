import type { Genre, StreamingApiGenre } from "../types/movie.types.js";

export const mapToGenre = (genre: StreamingApiGenre): Genre => {
  return {
    id: genre.id,
    name: genre.name,
  };
};
