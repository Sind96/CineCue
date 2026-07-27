import { useQuery } from "@tanstack/react-query";
import { getTopMovies } from "../api/movie.api";

export const useTopMovies = () => {
  return useQuery({
    queryKey: ["movies", "top"],
    queryFn: getTopMovies,
    staleTime: 1000 * 60 * 10,
  });
};
