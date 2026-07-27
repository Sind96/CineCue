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
      try {
        const { data } = await apiClient.get(`/streamimdbId/${imdbID}`);

        if (!data || !data.imdbId) {
          navigate("/error", { replace: true });
          return;
        }

        setMovie(data);
      } catch (error) {
        console.error("Error with fetchMovieByImdbId:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieByImdbId();
  }, [imdbID, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black pt-100">
        {" "}
        <ScaleLoader color="#e50914" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <section className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[80vh]">
        <img
          src={movie?.imageSet.horizontalPoster.w1440}
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
        <div className="space-y-2">
          <p>
            <span className="font-bold">Director:</span>{" "}
            {movie?.directors?.join(", ")}
          </p>
          <p>
            <span className="font-bold">Stars:</span>{" "}
            {movie?.cast?.slice(0, 5).join(", ")}
          </p>
        </div>

        {movie?.streamingOptions?.gb && (
          <div>
            <p className="font-bold mb-2">Watch Now On:</p>
            <div className="flex gap-4">
              {movie.streamingOptions.gb.map((opt, idx) => (
                <a
                  key={idx}
                  href={opt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={opt.service.imageSet.lightThemeImage}
                    alt={opt.service.name}
                    className="w-20 rounded-md shadow-md"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {movie && (
          <div className="flex justify-center">
            <AddToWatchListButton
              imdbId={movie?.imdbId}
              title={movie?.title}
              imageURL={movie?.imageSet.horizontalPoster.w1440}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default IndividualMoviePage;
