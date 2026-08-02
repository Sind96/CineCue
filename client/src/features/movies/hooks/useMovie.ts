import { useQuery } from "@tanstack/react-query";
import { getMovieByImdbId } from "../api/movie.api";

export const useMovie = (imdbId?: string) => {
  return useQuery({
    queryKey: ["movies", "detail", imdbId],
    queryFn: () => getMovieByImdbId(imdbId as string),
    enabled: Boolean(imdbId),
    staleTime: 1000 * 60 * 30,
  });
};
