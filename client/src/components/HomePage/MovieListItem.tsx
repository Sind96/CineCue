import type { MovieListItemProps } from "../../@types/movies.components.type";

const MovieListItem = ({ src, alt }: MovieListItemProps) => {
  return (
    <div className="relative min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] cursor-pointer transition-transform hover:scale-105">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-md object-cover"
      />
    </div>
  );
};

export default MovieListItem;
