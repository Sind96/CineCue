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
      navigate("/signin");
      return;
    }
    try {
      await API.post("/protected/watchlist", {
        imdbId,
        title,
        imageURL,
      });
    } catch (error) {
      console.error("Error with handleClick:", error);
    }
  };

  return <button onClick={handleClick}>Add to WatchList</button>;
};

export default AddToWatchListButton;
