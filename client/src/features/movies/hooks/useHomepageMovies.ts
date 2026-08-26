import { useQuery } from "@tanstack/react-query";
import { getHomepageMovies } from "../api/movie.api";
import { queryOptions } from "../../../lib/queryOptions";
import { queryKeys } from "../../../lib/queryKeys";

export const useHomepageMovies = () => {
  return useQuery({
    queryKey: queryKeys.movies.homepage,
    queryFn: getHomepageMovies,
    staleTime: queryOptions.movies.homepageStaleTime,
  });
};
