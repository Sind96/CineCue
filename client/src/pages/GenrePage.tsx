import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Navbar from "../components/NavBar/_Navbar";
import MovieListItem from "../components/HomePage/MovieListItem";
import { useMoviesByGenre } from "../features/movies/hooks/useMoviesByGenre";

const GenrePage = () => {
  const { genreId } = useParams();

  const genreMoviesQuery = useMoviesByGenre(genreId);
  const movies = genreMoviesQuery.data ?? [];

  if (!genreId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Invalid genre.
      </div>
    );
  }
  
  if (genreMoviesQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <ScaleLoader color="#e50914" />
      </div>
    );
  }

  if (genreMoviesQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Unable to load this genre. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold capitalize">
          {genreId?.replace("-", " ")} Movies
        </h1>

        {movies.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No movies found for this genre.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <li key={movie.imdbId}>
                <Link to={`/movie/${movie.imdbId}`}>
                  <MovieListItem
                    src={movie.posterUrl ?? ""}
                    alt={movie.title}
                    fixedAspect
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default GenrePage;
