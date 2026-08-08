type MoviePosterProps = {
  src: string;
  alt: string;
  fixedAspect?: boolean;
};

const MoviePoster = ({ src, alt, fixedAspect = false }: MoviePosterProps) => {
  return (
    <div className="relative min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] cursor-pointer transition-transform hover:scale-105">
      {fixedAspect ? (
        <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
      )}
    </div>
  );
};

export default MoviePoster;
