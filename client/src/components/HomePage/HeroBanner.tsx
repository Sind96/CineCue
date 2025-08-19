import { Link } from "react-router-dom";
import type { HeroBannerProps } from "../../@types/movies.components.type";

const HeroBanner = ({ movie }: HeroBannerProps) => {
  return (
    <section>
      <img src={movie.imageSet?.horizontalPoster?.w1080} alt={movie.title} />
      <div />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview || "No description available."}</p>
        <div>
          <Link to={`/movie/${movie.imdbId}`}>Watch Now</Link>
          <button>+ Add to Watchlist</button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
