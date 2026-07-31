import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/movie.api";

export const useGenreMovies = () => {
  return useQuery({
    queryKey: ["movies", "genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 30,
  });
};
