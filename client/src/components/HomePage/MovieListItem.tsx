import type { MovieListItemProps } from "../../@types/movies.components.type";

const MovieListItem = ({ src, alt }: MovieListItemProps) => {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};

export default MovieListItem;
