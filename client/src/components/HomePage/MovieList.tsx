import { useEffect, useState } from "react";
import {
  type streamingAvailabilityProps,
  type GenreGroup,
} from "../../@types/streamingAvailability/_streamingAvailability.type";
import MovieListItem from "./MovieListItem";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const MovieList = () => {
  const [topMovies, setTopMovies] = useState<streamingAvailabilityProps[]>([]);
  const [genreMovies, setGenreMovies] = useState<GenreGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [topRes, genreRes] = await Promise.all([
          fetch("http://localhost:3000/top20"),
          fetch("http://localhost:3000/streamgenre"),
        ]);
        const [topData, genreData] = await Promise.all([
          topRes.json(),
          genreRes.json(),
        ]);
        setTopMovies(topData);
        setGenreMovies(genreData);
      } catch (error) {
        console.error("Error with fetchMovies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <ScaleLoader color="#000000" />;

  return (
    <div>
      <div>
        <h2>Top Rated Movies</h2>
        <div className="flex autoflow-x">
          {topMovies.map((movie) => (
            <div key={movie.imdbId}>
              <Link to={`movie/${movie.imdbId}`}>
                <MovieListItem
                  src={movie.imageSet?.horizontalPoster?.w1080}
                  alt={movie.title}
                />
              </Link>
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
      {genreMovies.map((group) => (
        <div key={group.genre}>
          <Link to={`/genre/${group.genre.toLowerCase()}`}>
            <h2>{group.genre}</h2>
          </Link>
          <div className="flex autoflow-x">
            {group.movies.map((movie) => (
              <div key={movie.imdbId}>
                <Link to={`movie/${movie.imdbId}`}>
                  <MovieListItem
                    src={movie.imageSet?.horizontalPoster?.w1080}
                    alt={movie.title}
                  />
                </Link>
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
