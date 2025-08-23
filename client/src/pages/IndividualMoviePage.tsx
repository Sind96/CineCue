import { MdOutlineStarOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { streamingAvailabilityProps } from "../@types/streamingAvailability/_streamingAvailability.type";
import Navbar from "../components/NavBar/_Navbar";
import AddToWatchListButton from "../components/IndividualMoviePage/AddToWatchListButton";
import { ScaleLoader } from "react-spinners";

const IndividualMoviePage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<streamingAvailabilityProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieByImdbId = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/streamimdbId/${imdbID}`
        );

        if (!response.ok) {
          navigate("/error", { replace: true });
          return;
        }
        const data = await response.json();

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

  if (loading) return <ScaleLoader />;
  return (
    <div>
      <Navbar />
      <img src={movie?.imageSet.horizontalPoster.w1440} alt={movie?.title} />

      <div>
        <div>
          <div>
            <p>{movie?.title}</p>
            <div>
              {movie && (
                <p>Genre: {movie.genres.map((g) => g.name).join(", ")}</p>
              )}
            </div>
          </div>
          <p>
            <span>
              <MdOutlineStarOutline />
            </span>
            ({movie?.rating}/100)
          </p>
        </div>
        <p>{movie?.overview}</p>
        <p>Director: {movie?.directors.join(", ")}</p>
        <p>Stars: {movie?.cast.join(", ")}</p>
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
