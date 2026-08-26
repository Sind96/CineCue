import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre } from "../api/movie.api";
import { queryKeys } from "../../../lib/queryKeys";
import { queryOptions } from "../../../lib/queryOptions";

export const useMoviesByGenre = (genreId?: string) => {
  return useQuery({
    queryKey: queryKeys.movies.genre(genreId),
    queryFn: () => getMoviesByGenre(genreId as string),
    enabled: Boolean(genreId),
    staleTime: queryOptions.movies.genreStaleTime,
  });
};
