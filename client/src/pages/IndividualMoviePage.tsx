import { MdOutlineStarOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../features/movies/types/movie.types";
import Navbar from "../components/NavBar/_Navbar";
import AddToWatchListButton from "../components/IndividualMoviePage/AddToWatchListButton";
import { ScaleLoader } from "react-spinners";
import { apiClient } from "../lib/apiClient";

const IndividualMoviePage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieByImdbId = async () => {
      if (!imdbID) {
        navigate("/error", { replace: true });
        return;
      }

      try {
        const { data } = await apiClient.get<{ movie: Movie }>(
          `/movies/${imdbID}`,
        );

        if (!data.movie?.imdbId) {
          navigate("/error", { replace: true });
          return;
        }

        setMovie(data.movie);
      } catch (error) {
        console.error("Error with fetchMovieByImdbId:", error);
        navigate("/error", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    void fetchMovieByImdbId();
  }, [imdbID, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black pt-100">
        <ScaleLoader color="#e50914" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Movie details could not be loaded.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <section className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[80vh]">
        <img
          src={movie?.backdropUrl ?? movie?.posterUrl}
          alt={movie?.title}
          className="absolute inset-0 w-full h-full object-top object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/80 to-black flex items-end">
          <div className="px-6 md:px-12 pb-10 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              {movie?.title}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <MdOutlineStarOutline className="text-yellow-400 text-3xl" />
              <p className="text-lg font-semibold">
                {movie?.rating ? `${movie.rating}/100` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-8 space-y-6">
        {movie?.genres && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-red-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-300 leading-relaxed">{movie?.overview}</p>

        {movie?.streamingProviders.length > 0 && (
          <div>
            <p className="font-bold mb-2">Watch Now On:</p>

            <div className="flex flex-wrap gap-4">
              {movie.streamingProviders.map((provider) => (
                <a
                  key={`${provider.id}-${provider.type}-${provider.link}`}
                  href={provider.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-105 transition duration-300"
                >
                  {provider.logoUrl ? (
                    <img
                      src={provider.logoUrl}
                      alt={provider.name}
                      className="w-20 rounded-md shadow-md"
                    />
                  ) : (
                    <span>{provider.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {movie && (
          <div className="flex justify-center">
            <AddToWatchListButton
              imdbId={movie.imdbId}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseYear={movie.releaseYear}
              rating={movie.rating}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default IndividualMoviePage;
