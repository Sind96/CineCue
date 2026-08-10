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
    <div>
      <section className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-gray-900/60 p-6 text-center shadow-xl backdrop-blur-sm">
        {!hasStarted && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Can't decide what to watch?
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Let CineCue choose for you. You've got three chances.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSpin}
          disabled={spinCount >= 3 || isSpinning}
          className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
        <div className="mb-5 flex justify-center gap-2">
          {[0, 1, 2].map((spin) => (
            <span
              key={spin}
              className={`h-2.5 w-2.5 rounded-full ${
                spin < 3 - spinCount ? "bg-primary" : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        <p className="mb-4 text-sm text-gray-400">
          {3 - spinCount} {3 - spinCount === 1 ? "spin" : "spins"} remaining
        </p>

        {displayMovie && (
          <div className="mx-auto mb-6 w-full max-w-xs">
            <p className="mb-3 text-sm font-medium text-gray-400">
              You should watch
            </p>

            {isSpinning ? (
              <div className="relative overflow-hidden rounded-xl border border-primary bg-gray-950 shadow-2xl">
                {displayMovie.posterUrl ? (
                  <img
                    src={displayMovie.posterUrl}
                    alt={displayMovie.title}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center bg-gray-800 px-4 text-gray-400">
                    Poster unavailable
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-black/70 py-3 text-sm font-medium text-white">
                  Choosing...
                </div>
              </div>
            ) : (
              <Link to={`/movie/${displayMovie.imdbId}`}>
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-2xl transition hover:border-primary">
                  {displayMovie.posterUrl ? (
                    <img
                      src={displayMovie.posterUrl}
                      alt={displayMovie.title}
                      className="aspect-[2/3] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] w-full items-center justify-center bg-gray-800 px-4 text-gray-400">
                      Poster unavailable
                    </div>
                  )}
                </div>
              </Link>
            )}

            <div className="mt-3 h-[32px]" aria-live="polite">
              {!isSpinning && (
                <Link
                  to={`/movie/${displayMovie.imdbId}`}
                  className="text-xl font-bold text-white transition hover:text-primary"
                >
                  {displayMovie.title}
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieRoulette;
