import MovieListItem from "./MovieListItem";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useTopMovies } from "../../features/movies/hooks/useTopMovies";

const MovieList = () => {
  const topMoviesQuery = useTopMovies();
  const topMovies = topMoviesQuery.data ?? [];

  if (topMoviesQuery.isPending) {
    return (
      <div className="flex justify-center pt-100 bg-secondary">
        <ScaleLoader color="#e50914" />
      </div>
    );
  }

  if (topMoviesQuery.isError) {
    return (
      <div className="flex justify-center pt-32 text-white">
        Unable to load movies. Please try again.
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 space-y-10 pb-5">
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Top Rated Movies
        </h2>

        <div className="flex overflow-x-auto overflow-y-hidden gap-4 no-scrollbar snap-x snap-mandatory">
          {topMovies.map((movie) => (
            <Link
              key={movie.imdbId}
              to={`movie/${movie.imdbId}`}
              className="snap-start"
            >
              <MovieListItem
                src={movie.posterUrl ?? ""}
                alt={movie.title}
                fixedAspect
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieList;
