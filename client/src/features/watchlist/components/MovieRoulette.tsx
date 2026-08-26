import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export type RouletteMovie = {
  imdbId: string;
  title: string;
  posterUrl?: string | null;
};

type MovieRouletteProps = {
  movies: RouletteMovie[];
};

const MovieRoulette = ({ movies }: MovieRouletteProps) => {
  const [spinCount, setSpinCount] = useState(0);
  const [previousMovieIds, setPreviousMovieIds] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayMovie, setDisplayMovie] = useState<RouletteMovie | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasStarted = displayMovie !== null;

  const handleSpin = () => {
    if (movies.length === 0 || spinCount >= 3 || isSpinning) {
      return;
    }

    const availableMovies = movies.filter(
      (movie) => !previousMovieIds.includes(movie.imdbId),
    );

    const moviesToChooseFrom =
      availableMovies.length > 0 ? availableMovies : movies;

    const randomIndex = Math.floor(Math.random() * moviesToChooseFrom.length);
    const randomMovie = moviesToChooseFrom[randomIndex];

    setIsSpinning(true);

    intervalRef.current = setInterval(() => {
      setDisplayMovie((currentMovie) => {
        if (movies.length === 1) {
          return movies[0];
        }

        const previewMovies = movies.filter(
          (movie) => movie.imdbId !== currentMovie?.imdbId,
        );

        const previewIndex = Math.floor(Math.random() * previewMovies.length);

        return previewMovies[previewIndex];
      });
    }, 100);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setDisplayMovie(randomMovie);

      setPreviousMovieIds((currentIds) => [...currentIds, randomMovie.imdbId]);

      setSpinCount((currentCount) => currentCount + 1);
      setIsSpinning(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="px-6 py-8 text-center sm:px-8">
      <section>
        {!hasStarted && (
          <div className="mb-8 pt-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
              🎲
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Can't decide what to watch?
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Let CineCue choose for you. You've got three chances.
            </p>
          </div>
        )}

        {displayMovie && (
          <div className="mx-auto mb-7 w-full max-w-[240px] sm:max-w-[260px]">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              {isSpinning ? "Finding your movie..." : "You should watch"}
            </p>

            <div
              className={`relative overflow-hidden rounded-2xl border bg-surface-elevated shadow-card transition ${
                isSpinning
                  ? "border-primary"
                  : "border-border hover:border-primary"
              }`}
            >
              {isSpinning ? (
                <>
                  {displayMovie.posterUrl ? (
                    <img
                      src={displayMovie.posterUrl}
                      alt={displayMovie.title}
                      className="aspect-[2/3] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center px-4 text-sm text-muted-foreground">
                      Poster unavailable
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-black/75 py-3 text-sm font-medium text-white">
                    Choosing...
                  </div>
                </>
              ) : (
                <Link to={`/movie/${displayMovie.imdbId}`}>
                  {displayMovie.posterUrl ? (
                    <img
                      src={displayMovie.posterUrl}
                      alt={displayMovie.title}
                      className="aspect-[2/3] w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center px-4 text-sm text-muted-foreground">
                      Poster unavailable
                    </div>
                  )}
                </Link>
              )}
            </div>

            <div className="mt-4 min-h-8" aria-live="polite">
              {!isSpinning && (
                <Link
                  to={`/movie/${displayMovie.imdbId}`}
                  className="text-xl font-bold text-foreground transition hover:text-primary"
                >
                  {displayMovie.title}
                </Link>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSpin}
          disabled={spinCount >= 3 || isSpinning}
          className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={isSpinning ? "animate-spin" : ""} aria-hidden="true">
            🎲
          </span>

          {isSpinning
            ? "Choosing..."
            : spinCount >= 3
              ? "No Spins Left"
              : spinCount === 0
                ? "Spin the Roulette"
                : "Spin Again"}
        </button>

        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2].map((spin) => (
            <span
              key={spin}
              className={`h-2.5 w-2.5 rounded-full transition ${
                spin < 3 - spinCount ? "bg-primary" : "bg-surface-elevated"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {3 - spinCount} {3 - spinCount === 1 ? "spin" : "spins"} remaining
        </p>
      </section>
    </div>
  );
};

export default MovieRoulette;
