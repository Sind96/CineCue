import { useNavigate } from "react-router-dom";
import type { AddToWatchListProps } from "../../@types/movies.components.type";
import { useAuth } from "../../hooks/AuthContext";
import API from "../../services/axios";

const AddToWatchListButton = ({
  imdbId,
  title,
  imageURL,
}: AddToWatchListProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!isAuthenticated) {
      alert("Please login to add to watchlist.");
      navigate("/signin");
      return;
    }
    try {
      await API.post("/protected/watchlist", {
        imdbId,
        title,
        imageURL,
      });
      alert("Movie has been added to watchlist!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        alert("This movie is already in your watchlist.");
      } else {
        console.error("Error with handleClick:", error);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return <button onClick={handleClick}>Add to WatchList</button>;
};

export default AddToWatchListButton;
