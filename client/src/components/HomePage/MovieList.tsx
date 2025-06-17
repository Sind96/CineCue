import { useEffect, useState } from "react";
import type { GenreGroup } from "../../@types/streamingAvailability/_streamingAvailability.type";
import MovieListItem from "./MovieListItem";

const MovieList = () => {
  const [genreMovies, setGenreMovies] = useState<GenreGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/streamgenre");
        const data = await res.json();
        setGenreMovies(data);
      } catch (error) {
        console.error("Error with fetchMovies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {genreMovies.map((group) => (
        <div key={group.genre}>
          <h2>{group.genre}</h2>
          <div className="flex autoflow-x">
            {group.movies.map((movie) => (
              <div key={movie.imdbId}>
                <MovieListItem
                  src={movie.imageSet.horizontalPoster.w1080}
                  alt={movie.title}
                />
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
