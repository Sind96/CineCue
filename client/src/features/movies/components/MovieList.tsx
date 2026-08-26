import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useHomepageMovies } from "../hooks/useHomepageMovies";
import MovieRow from "./MovieRow";
import MovieHero from "./MovieHero";

const MovieList = () => {
  const homepageQuery = useHomepageMovies();
  const topMovies = homepageQuery.data?.topMovies ?? [];
  const genreGroups = homepageQuery.data?.genreGroups ?? [];

  const [featuredMovieIndex, setFeaturedMovieIndex] = useState(0);

  const featuredMovies = topMovies.filter(
    (movie) => movie.backdropUrl || movie.posterUrl,
  );

  useEffect(() => {
    setFeaturedMovieIndex(0);
  }, [featuredMovies.length]);

  useEffect(() => {
    if (featuredMovies.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setFeaturedMovieIndex((currentIndex) => {
        return (currentIndex + 1) % featuredMovies.length;
      });
    }, 7000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [featuredMovies.length]);

  const featuredMovie = featuredMovies[featuredMovieIndex];

  if (homepageQuery.isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <ScaleLoader color="var(--accent)" />

          <p className="mt-4 text-sm text-muted-foreground">
            Loading movies...
          </p>
        </div>
      </main>
    );
  }

  if (homepageQuery.isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 text-foreground">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <span className="text-xl text-red-500">!</span>
          </div>

          <h1 className="mt-5 text-xl font-semibold text-foreground">
            Movies unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We couldn't load CineCue right now. Please try again.
          </p>

          <button
            type="button"
            onClick={() => homepageQuery.refetch()}
            className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {featuredMovie && <MovieHero movie={featuredMovie} />}

      <div className="mx-auto max-w-[1900px] space-y-10 px-4 py-10 sm:px-6 lg:px-8">
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
      </div>
    </main>
  );
};

export default MovieList;
