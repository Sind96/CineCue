import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import type { Movie } from "../types/movie.types";

type MovieHeroProps = {
  movie: Movie;
};

const MovieHero = ({ movie }: MovieHeroProps) => {
  const heroImage = movie.backdropUrl ?? movie.posterUrl;

  return (
    <section className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
      <div
        key={movie.imdbId}
        className="absolute inset-0 animate-[fadeIn_700ms_ease-in-out]"
      >
        {heroImage && (
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[420px] max-w-[1700px] items-end px-4 pb-14 sm:px-6 md:min-h-[520px] md:items-center md:pb-0 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Featured
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{movie.releaseYear}</span>

            <span>•</span>

            <span>{movie.genres.map((genre) => genre.name).join(" • ")}</span>

            {movie.rating !== undefined && (
              <>
                <span>•</span>

                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  {movie.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {movie.overview}
          </p>

          <div className="mt-7">
            <Link
              to={`/movie/${movie.imdbId}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
            >
              <Play className="h-4 w-4 fill-current" />
              View Movie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;
