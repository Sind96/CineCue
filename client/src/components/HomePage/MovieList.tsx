import { useEffect, useState } from "react";
import {
  type streamingAvailabilityProps,
  type GenreGroup,
} from "../../@types/streamingAvailability/_streamingAvailability.type";
import MovieListItem from "./MovieListItem";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import API from "../../services/axios";

const MovieList = () => {
  const [topMovies, setTopMovies] = useState<streamingAvailabilityProps[]>([]);
  const [genreMovies, setGenreMovies] = useState<GenreGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [topRes, genreRes] = await Promise.all([
          API.get("/top20"),
          API.get("/streamgenre"),
        ]);

        setTopMovies(topRes.data);
        setGenreMovies(genreRes.data);
      } catch (error) {
        console.error("Error with fetchMovies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center pt-100 bg-secondary">
        {" "}
        <ScaleLoader color="#e50914" />
      </div>
    );

  return (
    <div className="pt-20 px-6 space-y-10">
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Top Rated Movies
        </h2>

        <div className="flex overflow-x-auto overflow-y-hidden gap-4 no-scrollbar snap-x snap-mandatory">
          {topMovies.map((movie) => (
            <Link
              key={movie.imdbId}
              to={`movie/${movie.imdbId}`}
              className="snap-start"
            >
              <MovieListItem
                src={movie.imageSet?.verticalPoster?.w720}
                alt={movie.title}
                fixedAspect
              />
            </Link>
          ))}
        </div>
      </section>

      {genreMovies.map((group) => (
        <section key={group.genre}>
          <Link to={`/genre/${group.genre.toLowerCase()}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 hover:text-accent transition-colors">
              {group.genre}
            </h2>
          </Link>
          <div className="flex overflow-x-auto overflow-y-hidden gap-4 no-scrollbar">
            {group.movies.map((movie) => (
              <Link key={movie.imdbId} to={`movie/${movie.imdbId}`}>
                <MovieListItem
                  src={movie.imageSet?.horizontalPoster?.w1080}
                  alt={movie.title}
                />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MovieList;
