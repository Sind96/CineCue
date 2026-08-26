import { Link, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Navbar from "../../../components/navigation/Navbar";
import MoviePoster from "../components/MoviePoster";
import { useMoviesByGenre } from "../hooks/useMoviesByGenre";

const GenrePage = () => {
  const { genreId } = useParams();

  const genreMoviesQuery = useMoviesByGenre(genreId);
  const movies = genreMoviesQuery.data ?? [];

  if (!genreId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1900px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-xl text-red-500">!</span>
            </div>

            <h1 className="mt-5 text-xl font-semibold text-foreground">
              Movies unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We couldn't load the movies in this genre. Please try again.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => genreMoviesQuery.refetch()}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
              >
                Try Again
              </button>

              <Link
                to="/"
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-elevated"
              >
                Back Home
              </Link>
            </div>
          </div>
        </main>
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
                  <MoviePoster
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
