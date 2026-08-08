import { ScaleLoader } from "react-spinners";
import { useHomepageMovies } from "../hooks/useHomepageMovies";
import MovieRow from "./MovieRow";

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
        <MovieRow title="Top Rated Movies" movies={topMovies} />
        {genreGroups.map((group) => (
          <MovieRow
            key={group.genre.id}
            title={group.genre.name}
            movies={group.movies}
            href={`/genre/${group.genre.id}`}
            posterStyle="backdrop"
          />
        ))}
      </section>
    </div>
  );
};

export default MovieList;
