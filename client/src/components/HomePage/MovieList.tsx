import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieListItem from "./MovieListItem";
import type { streamingAvailabilityProps } from "../../@types/streamingAvailability/_streamingAvailability.type";

const MovieList = () => {
  const [actionMovie, setActionMovie] = useState<streamingAvailabilityProps[]>(
    []
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("http://localhost:3000/stream/Action");
      const data = await res.json();
      setActionMovie(data);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <p>IMDb Top 100</p>
      </div>
      <div></div>

      <div>
        <p>Trending Now</p>
      </div>
      <div></div>

      <div>
        <p>Action</p>
      </div>
      {actionMovie.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.imdbId}`}>
            <MovieListItem
              src={movie.imageSet?.horizontalPoster?.w1440}
              alt={movie.title}
            />
          </Link>
        </li>
      ))}
      <div></div>

      {/* <div>
        <p>Adventure</p>
      </div>
      <div></div>

      <div>
        <p>Animation</p>
      </div>
      <div></div>

      <div>
        <p>Comedy</p>
      </div>
      <div></div>

      <div>
        <p>Crime</p>
      </div>
      <div></div>

      <div>
        <p>Documentary</p>
      </div>
      <div></div>

      <div>
        <p>Drama</p>
      </div>
      <div></div>

      <div>
        <p>Family</p>
      </div>
      <div></div>

      <div>
        <p>Fantasy</p>
      </div>
      <div></div>

      <div>
        <p>History</p>
      </div>
      <div></div>

      <div>
        <p>Horror</p>
      </div>
      <div></div>

      <div>
        <p>Drama</p>
      </div>
      <div></div>

      <div>
        <p>Music</p>
      </div>
      <div></div>

      <div>
        <p>Mystery</p>
      </div>
      <div></div>

      <div>
        <p>News</p>
      </div>
      <div></div>

      <div>
        <p>Reality</p>
      </div>
      <div></div>

      <div>
        <p>Romance</p>
      </div>
      <div></div>

      <div>
        <p>Science Fiction</p>
      </div>
      <div></div>

      <div>
        <p>Talk Show</p>
      </div>
      <div></div>

      <div>
        <p>Thriller</p>
      </div>
      <div></div>

      <div>
        <p>War</p>
      </div>
      <div></div>

      <div>
        <p>Western</p>
      </div>
      <div></div> */}
    </div>
  );
};

export default MovieList;
