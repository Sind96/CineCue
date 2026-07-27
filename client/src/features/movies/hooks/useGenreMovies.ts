import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre } from "../api/movie.api";

export const useGenreMovies = () => {
  return useQuery({
    queryKey: ["movies", "genres"],
    queryFn: getMoviesByGenre,
    staleTime: 1000 * 60 * 30,
  });
};
