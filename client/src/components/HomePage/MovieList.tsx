import MovieListItem from "./MovieListItem";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useHomepageMovies } from "../../features/movies/hooks/useHomepageMovies";

const MovieList = () => {
  const homepageQuery = useHomepageMovies();
  const topMovies = homepageQuery.data?.topMovies ?? [];
  const genreGroups = homepageQuery.data?.genreGroups ?? [];

  if (homepageQuery.isPending) {
    return (
      <div className="flex justify-center pt-100 bg-secondary">
        <ScaleLoader color="#e50914" />
      </div>
    );
  }

  if (homepageQuery.isError) {
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

        {genreGroups.map((group) => (
          <section key={group.genre.id}>
            <Link to={`/genre/${group.genre.id}`}>
              <h2 className="mb-4 text-xl font-bold text-white transition-colors hover:text-accent sm:text-2xl">
                {group.genre.name}
              </h2>
            </Link>

            <div className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar">
              {group.movies.map((movie) => (
                <Link key={movie.imdbId} to={`/movie/${movie.imdbId}`}>
                  <MovieListItem
                    src={movie.backdropUrl ?? movie.posterUrl ?? ""}
                    alt={movie.title}
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
};

export default MovieList;
