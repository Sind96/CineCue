import { Link } from "react-router-dom";
import type { Movie } from "../types/movie.types";
import MoviePoster from "./MoviePoster";

type MovieRowProps = {
  title: string;
  movies: Movie[];
  href?: string;
  posterStyle?: "poster" | "backdrop";
};

const MovieRow = ({
  title,
  movies,
  href,
  posterStyle = "poster",
}: MovieRowProps) => {
  return (
    <section>
      <div className="mb-4">
        {href ? (
          <Link to={href} className="group inline-flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              {title}
            </h2>

            <span className="text-sm font-medium text-muted-foreground transition group-hover:text-foreground">
              View all →
            </span>
          </Link>
        ) : (
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {title}
          </h2>
        )}
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-4 sm:gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.imdbId}
            to={`/movie/${movie.imdbId}`}
            className={
              posterStyle === "poster"
                ? "group w-36 shrink-0 transition-transform duration-300 hover:-translate-y-1 sm:w-40 md:w-44 lg:w-48"
                : "group w-64 shrink-0 transition-transform duration-300 hover:-translate-y-1 sm:w-72 md:w-80 lg:w-96"
            }
          >
            <div className="relative">
              <MoviePoster
                src={
                  posterStyle === "backdrop"
                    ? (movie.backdropUrl ?? movie.posterUrl ?? "")
                    : (movie.posterUrl ?? "")
                }
                alt={movie.title}
                fixedAspect={posterStyle === "poster"}
              />

              {posterStyle === "backdrop" && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-3 pt-10">
                  <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                    {movie.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-300">
                    {movie.releaseYear}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
