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
      {href ? (
        <Link to={href}>
          <h2 className="mb-4 text-xl font-bold text-white transition-colors hover:text-accent sm:text-2xl">
            {title}
          </h2>
        </Link>
      ) : (
        <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
          {title}
        </h2>
      )}
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory">
        {movies.map((movie) => (
          <Link
            key={movie.imdbId}
            to={`/movie/${movie.imdbId}`}
            className="snap-start"
          >
            <MoviePoster
              src={
                posterStyle === "backdrop"
                  ? (movie.backdropUrl ?? movie.posterUrl ?? "")
                  : (movie.posterUrl ?? "")
              }
              alt={movie.title}
              fixedAspect={posterStyle === "poster"}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
