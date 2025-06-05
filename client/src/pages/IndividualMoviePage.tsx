// import { MdOutlineStarOutline } from "react-icons/md";
// import AddToWatchList from "../components/IndividualMoviePage/AddToWatchList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { streamingAvailabilityProps } from "../@types/streamingAvailability/_streamingAvailability.type";

const IndividualMoviePage = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<streamingAvailabilityProps | null>(null);

  useEffect(() => {
    const fetchMovieByImdbId = async () => {
      const response = await fetch(
        `http://localhost:3000/streamimdbId/${imdbID}`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieByImdbId();
  }, [imdbID]);

  return (
    <div>
      {/* <img src="" />

      <div>
        <div>
          <div>
            <p>{}</p> */}
      <p>
        {movie && <p>Genre: {movie.genres.map((g) => g.name).join(" ,")}</p>}
      </p>
      {/* </div>
          <p>
            <span>
              <MdOutlineStarOutline />
            </span>
            ({}/100)
          </p>
        </div>
        <p>{}</p>
        <p>Director: {}</p>
        <p>Stars: {}</p>
        <div>
          <div>
            <p>Watch Now On:</p>
            <a href="">
              <img src={""} />
            </a>
          </div>
        </div>
        <AddToWatchList />
      </div> */}
    </div>
  );
};

export default IndividualMoviePage;
