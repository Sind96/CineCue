type MoviePosterProps = {
  src: string;
  alt: string;
  fixedAspect?: boolean;
};

const MoviePoster = ({ src, alt, fixedAspect = false }: MoviePosterProps) => {
  const aspectClass = fixedAspect ? "aspect-[2/3]" : "aspect-video";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-surface-elevated shadow-card ${aspectClass}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
          Poster unavailable
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
    </div>
  );
};

export default MoviePoster;
