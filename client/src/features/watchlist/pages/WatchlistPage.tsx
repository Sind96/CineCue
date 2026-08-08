import { useState } from "react";
import Navbar from "../../../components/navigation/Navbar";
import ImFeelingLuckyButton from "../components/ImFeelingLuckyButton";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useWatchlist } from "../hooks/useWatchlist";
import { useRemoveFromWatchlist } from "../hooks/useRemoveFromWatchlist";

const WatchlistPage = () => {
  const [deleting, setDeleting] = useState<string | null>(null);

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
          theme: "light",
          transition: Bounce,
        });
      },

      onError: (error) => {
        console.error("Error with handleRemove:", error);

        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
          autoClose: 1500,
          theme: "light",
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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Loading your watchlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground mt-10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Watchlist</h2>

        {watchlistQuery.isError ? (
          <p className="text-red-500 text-center">
            Unable to load your watchlist. Please try again.
          </p>
        ) : watchList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              You haven't added any movies yet.
            </p>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchList.map((movie) => (
              <li key={movie.imdbId} className="relative group">
                <Link to={`/movie/${movie.imdbId}`}>
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-800 text-center text-sm text-gray-300">
                      Poster unavailable
                    </div>
                  )}
                </Link>

                <button
                  onClick={() => handleRemove(movie.imdbId)}
                  disabled={removeMutation.isPending}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-600/80 text-white shadow hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
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

        {watchList.length > 0 && (
          <div className="mt-12 flex justify-center">
            <ImFeelingLuckyButton watchList={watchList} />
          </div>
        )}
      </main>
    </div>
  );
};

export default WatchlistPage;
