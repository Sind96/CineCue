import { MdOutlineStarOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navigation/Navbar";
import AddToWatchlistButton from "../../watchlist/components/AddToWatchlistButton";
import { useMovie } from "../hooks/useMovie";
import AddToCollectionButton from "../../collections/components/AddToCollectionButton";
import { ScaleLoader } from "react-spinners";

const IndividualMoviePage = () => {
  const { imdbID } = useParams();
  const movieQuery = useMovie(imdbID);
  const movie = movieQuery.data;

  if (movieQuery.isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1700px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScaleLoader color="var(--accent)" />

            <p className="mt-4 text-sm text-muted-foreground">
              Loading movie details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (movieQuery.isError || !movie) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto flex min-h-[60vh] w-full max-w-[1700px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-xl text-red-500">!</span>
            </div>

            <h1 className="mt-5 text-xl font-semibold text-foreground">
              Movie unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We couldn't load this movie's details. Please try again or return
              to the homepage.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => movieQuery.refetch()}
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <section className="relative min-h-[520px] overflow-hidden md:min-h-[620px]">
        {(movie.backdropUrl ?? movie.posterUrl) && (
          <img
            src={movie.backdropUrl ?? movie.posterUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-[1700px] items-end px-4 pb-12 sm:px-6 md:min-h-[620px] md:items-center md:pb-0 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{movie.releaseYear}</span>

              <span>•</span>

              <span>{movie.genres.map((genre) => genre.name).join(" • ")}</span>

              <span>•</span>

              <span className="flex items-center gap-1">
                <MdOutlineStarOutline className="text-yellow-400" />
                {movie.rating.toFixed(1)}
              </span>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {movie.overview}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <AddToWatchlistButton
                imdbId={movie.imdbId}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseYear={movie.releaseYear}
                rating={movie.rating}
              />

              <AddToCollectionButton
                imdbId={movie.imdbId}
                title={movie.title}
                year={movie.releaseYear}
                posterUrl={movie.posterUrl}
                overview={movie.overview}
                genres={movie.genres.map((genre) => genre.id)}
                externalSource={movie.externalId}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1700px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {movie.streamingProviders.length > 0 ? (
            <>
              <h2 className="mb-5 text-xl font-bold text-foreground md:text-2xl">
                Available On
              </h2>

              <div className="flex flex-wrap gap-3">
                {movie.streamingProviders.map((provider, index) => (
                  <a
                    key={`${provider.id}-${provider.type}-${provider.link}-${index}`}
                    href={provider.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-16 items-center rounded-xl border border-border bg-surface px-4 py-3 transition hover:-translate-y-0.5 hover:bg-surface-elevated"
                  >
                    {provider.logoUrl ? (
                      <img
                        src={provider.logoUrl}
                        alt={provider.name}
                        className="max-h-10 w-20 object-contain"
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {provider.name}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
                Available On
              </h2>

              <p className="text-sm text-muted-foreground">
                Streaming availability is currently unavailable.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default IndividualMoviePage;
