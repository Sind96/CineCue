import { useQuery } from "@tanstack/react-query";
import { getHomepageMovies } from "../api/movie.api";

export const useHomepageMovies = () => {
  return useQuery({
    queryKey: ["movies", "homepage"],
    queryFn: getHomepageMovies,
    staleTime: 1000 * 60 * 10,
  });
};
