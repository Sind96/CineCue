import { MdOutlineStarOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { streamingAvailabilityProps } from "../@types/streamingAvailability/_streamingAvailability.type";
import Navbar from "../components/NavBar/_Navbar";
import AddToWatchListButton from "../components/IndividualMoviePage/AddToWatchListButton";
import { ScaleLoader } from "react-spinners";
import API from "../services/axios";

const IndividualMoviePage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<streamingAvailabilityProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieByImdbId = async () => {
      try {
        const { data } = await API.get(`/streamimdbId/${imdbID}`);

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

      <section className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[70vh]">
        <img
          src={movie?.imageSet.horizontalPoster.w1440}
          alt={movie?.title}
          className="absolute inset-0 w-full h-full object-top object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90 flex items-end">
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
      </section>

      <div>
        <div>
          <div>
            <p>Watch Now On:</p>
            <a href={movie?.streamingOptions.gb[0].link}>
              <img
                src={
                  movie?.streamingOptions.gb[0].service.imageSet.lightThemeImage
                }
              />
            </a>
          </div>
        </div>
        <AddToWatchListButton
          imdbId={movie?.imdbId}
          title={movie?.title}
          imageURL={movie?.imageSet.horizontalPoster.w1440}
        />
      </div>
    </div>
  );
};

export default IndividualMoviePage;
