import { useState } from "react";
import Navbar from "../../../components/navigation/Navbar";
import MovieRouletteModal from "../components/MovieRouletteModal";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useWatchlist } from "../hooks/useWatchlist";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";
import MoviePoster from "../../movies/components/MoviePoster";
import { ScaleLoader } from "react-spinners";

const WatchlistPage = () => {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);

  const watchlistQuery = useWatchlist();
  const removeMutation = useRemoveFromWatchlist();

  const watchList = watchlistQuery.data ?? [];

  const handleRemove = (imdbId: string) => {
    setDeleting(imdbId);

    removeMutation.mutate(imdbId, {
      onSuccess: () => {
        toast.success("Movie removed from watchlist", {
          position: "top-center",
          autoClose: 1500,
          transition: Bounce,
        });
      },

      onError: (error) => {
        console.error("Error with handleRemove:", error);

        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
          autoClose: 1500,
          transition: Bounce,
        });
      },

      onSettled: () => {
        setDeleting(null);
      },
    });
  };

  if (watchlistQuery.isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1900px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScaleLoader color="var(--accent)" />

            <p className="mt-4 text-sm text-muted-foreground">
              Loading your watchlist...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-[1900px] px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Your Library
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Your Watchlist
            </h1>

            {!watchlistQuery.isError && (
              <p className="mt-2 text-sm text-muted-foreground">
                {watchList.length === 1
                  ? "1 movie saved"
                  : `${watchList.length} movies saved`}
              </p>
            )}
          </div>

          {watchList.length > 0 && (
            <button
              type="button"
              onClick={() => setIsRouletteOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
            >
              🎲 Pick a Movie
            </button>
          )}
        </header>

        {watchlistQuery.isError ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-xl text-red-500">!</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Watchlist unavailable
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't load your watchlist. Please try again.
            </p>

            <button
              type="button"
              onClick={() => watchlistQuery.refetch()}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Try Again
            </button>
          </div>
        ) : watchList.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Your watchlist is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Save movies you're interested in and let CineCue help you choose
              what to watch later.
            </p>

            <Link
              to="/"
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {watchList.map((movie) => (
              <li key={movie.imdbId} className="group relative">
                <Link
                  to={`/movie/${movie.imdbId}`}
                  className="block transition-transform duration-300 hover:-translate-y-1"
                >
                  <MoviePoster
                    src={movie.posterUrl ?? ""}
                    alt={movie.title}
                    fixedAspect
                  />

                  <div className="mt-3">
                    <h2 className="truncate text-sm font-semibold text-foreground">
                      {movie.title}
                    </h2>

                    {movie.releaseYear && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {movie.releaseYear}
                      </p>
                    )}
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => handleRemove(movie.imdbId)}
                  disabled={removeMutation.isPending}
                  aria-label={`Remove ${movie.title} from watchlist`}
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-0 shadow transition hover:bg-red-600 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting === movie.imdbId ? (
                    <span className="text-xs">...</span>
                  ) : (
                    <MdDelete className="h-5 w-5" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        <MovieRouletteModal
          isOpen={isRouletteOpen}
          onClose={() => setIsRouletteOpen(false)}
          movies={watchList}
        />
      </main>
    </div>
  );
};

export default WatchlistPage;
