import { Link, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import Navbar from "../../../components/navigation/Navbar";
import { useCollection } from "../hooks/useCollection";
import { useRemoveMovieFromCollection } from "../hooks/useRemoveMovieFromCollection";
import { useState } from "react";
import EditCollectionModal from "../components/EditCollectionModal";
import MovieRouletteModal from "../../watchlist/components/MovieRouletteModal";
import { ScaleLoader } from "react-spinners";

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
            transition: Bounce,
          });
        },

        onError: (error) => {
          console.error("Error removing movie from collection:", error);

          toast.error("Unable to remove movie. Please try again.", {
            position: "top-center",
            autoClose: 1500,
            transition: Bounce,
          });
        },
      },
    );
  };

  if (!collectionId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        Invalid collection.
      </div>
    );
  }

  if (collectionQuery.isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1900px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScaleLoader color="var(--accent)" />

            <p className="mt-4 text-sm text-muted-foreground">
              Loading collection...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (collectionQuery.isError || !collection) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1900px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-xl text-red-500">!</span>
            </div>

            <h1 className="mt-5 text-xl font-semibold text-foreground">
              Collection unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We couldn't load this collection. Please try again or return to
              your collections.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => collectionQuery.refetch()}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
              >
                Try Again
              </button>

              <Link
                to="/collections"
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-elevated"
              >
                Back to Collections
              </Link>
            </div>
          </div>
        </main>
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

      <main className="mx-auto w-full max-w-[1900px] px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <Link
            to="/collections"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            ← Back to collections
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Collection
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {collection.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {collection.description ?? "No description has been added."}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-full bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">
                  {collection.visibility.toLowerCase()}
                </span>

                <span className="text-sm text-muted-foreground">
                  {collection.movies.length === 1
                    ? "1 movie"
                    : `${collection.movies.length} movies`}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsRouletteOpen(true)}
                disabled={collection.movies.length === 0}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                🎲 Pick a Movie
              </button>

              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-elevated"
              >
                Edit Collection
              </button>
            </div>
          </div>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            Movies
          </h2>

          {collection.movies.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 text-center">
              <h3 className="text-xl font-semibold text-foreground">
                This collection is empty
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Add movies from a movie detail page.
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
              {collection.movies.map((collectionMovie) => (
                <li key={collectionMovie.id} className="group relative">
                  <Link
                    to={`/movie/${collectionMovie.movie.imdbId}`}
                    className="block transition-transform duration-300 hover:-translate-y-1"
                  >
                    {collectionMovie.movie.posterUrl ? (
                      <img
                        src={collectionMovie.movie.posterUrl}
                        alt={collectionMovie.movie.title}
                        className="aspect-[2/3] w-full rounded-xl object-cover shadow-card"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-surface-elevated px-4 text-center text-sm text-muted-foreground">
                        Poster unavailable
                      </div>
                    )}

                    <div className="mt-3">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {collectionMovie.movie.title}
                      </h3>

                      {collectionMovie.movie.year && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {collectionMovie.movie.year}
                        </p>
                      )}
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveMovie(collectionMovie.movie.imdbId)
                    }
                    disabled={removeMovieMutation.isPending}
                    aria-label={`Remove ${collectionMovie.movie.title} from collection`}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-100 shadow transition hover:bg-red-600 md:opacity-0 md:group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60"
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
