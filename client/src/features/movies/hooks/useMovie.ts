import { useQuery } from "@tanstack/react-query";
import { getMovieByImdbId } from "../api/movie.api";
import { queryKeys } from "../../../lib/queryKeys";
import { queryOptions } from "../../../lib/queryOptions";

export const useMovie = (imdbId?: string) => {
  return useQuery({
    queryKey: queryKeys.movies.detail(imdbId),
    queryFn: () => getMovieByImdbId(imdbId as string),
    enabled: Boolean(imdbId),
    staleTime: queryOptions.movies.detailStaleTime,
  });
};
