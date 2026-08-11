import { Link, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import Navbar from "../../../components/navigation/Navbar";
import { useCollection } from "../hooks/useCollection";
import { useRemoveMovieFromCollection } from "../hooks/useRemoveMovieFromCollection";
import { useState } from "react";
import EditCollectionModal from "../components/EditCollectionModal";
import MovieRouletteModal from "../../watchlist/components/MovieRouletteModal";

const CollectionPage = () => {
  const { collectionId } = useParams();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);

  const collectionQuery = useCollection(collectionId);
  const removeMovieMutation = useRemoveMovieFromCollection();

  const collection = collectionQuery.data;

  const handleRemoveMovie = (imdbId: string) => {
    if (!collectionId) {
      return;
    }

    removeMovieMutation.mutate(
      {
        collectionId,
        imdbId,
      },
      {
        onSuccess: () => {
          toast.success("Movie removed from collection.", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce,
          });
        },

        onError: (error) => {
          console.error("Error removing movie from collection:", error);

          toast.error("Unable to remove movie. Please try again.", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce,
          });
        },
      },
    );
  };

  if (!collectionId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        Invalid collection.
      </div>
    );
  }

  if (collectionQuery.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        Loading collection...
      </div>
    );
  }

  if (collectionQuery.isError || !collection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        Unable to load this collection.
      </div>
    );
  }

  const rouletteMovies = collection.movies.map((collectionMovie) => ({
    imdbId: collectionMovie.movie.imdbId,
    title: collectionMovie.movie.title,
    posterUrl: collectionMovie.movie.posterUrl,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <header className="mb-10">
          <Link
            to="/collections"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to collections
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {collection.name}
              </h1>

              <p className="mt-2 text-gray-400">
                {collection.description ?? "No description has been added."}
              </p>

              <span className="mt-4 inline-block rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                {collection.visibility.toLowerCase()}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="shrink-0 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Edit Collection
            </button>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => setIsRouletteOpen(true)}
              disabled={collection.movies.length === 0}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              🎲 Pick a Movie
            </button>

            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Edit Collection
            </button>
          </div>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-white">Movies</h2>

          {collection.movies.length === 0 ? (
            <div className="rounded-xl border border-gray-800 bg-black/40 p-10 text-center">
              <p className="text-lg text-gray-300">
                This collection does not contain any movies yet.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Add movies from a movie detail page.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {collection.movies.map((collectionMovie) => (
                <li key={collectionMovie.id} className="group relative">
                  <Link
                    to={`/movie/${collectionMovie.movie.imdbId}`}
                    className="block"
                  >
                    {collectionMovie.movie.posterUrl ? (
                      <img
                        src={collectionMovie.movie.posterUrl}
                        alt={collectionMovie.movie.title}
                        className="h-72 w-full rounded-lg object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-72 w-full items-center justify-center rounded-lg bg-gray-800 px-4 text-center text-sm text-gray-300">
                        Poster unavailable
                      </div>
                    )}

                    <h3 className="mt-3 font-medium text-white">
                      {collectionMovie.movie.title}
                    </h3>

                    {collectionMovie.movie.year && (
                      <p className="mt-1 text-sm text-gray-400">
                        {collectionMovie.movie.year}
                      </p>
                    )}
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveMovie(collectionMovie.movie.imdbId)
                    }
                    disabled={removeMovieMutation.isPending}
                    aria-label={`Remove ${collectionMovie.movie.title} from collection`}
                    className="absolute right-2 top-2 rounded-full bg-red-600/80 p-2 text-white opacity-0 shadow transition hover:bg-red-700 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <MovieRouletteModal
          isOpen={isRouletteOpen}
          onClose={() => setIsRouletteOpen(false)}
          movies={rouletteMovies}
        />

        <EditCollectionModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          collection={collection}
        />
      </main>
    </div>
  );
};

export default CollectionPage;
