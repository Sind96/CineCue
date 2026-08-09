import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/movie.api";
import { queryKeys } from "../../../lib/queryKeys";

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.movies.search(query),
    queryFn: () => searchMovies(query),
    enabled: query.trim().length > 0,
  });
};
