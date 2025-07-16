import type { AddToWatchListProps } from "../../@types/movies.components.type";
import API from "../../services/axios";

const AddToWatchListButton = ({
  imdbId,
  title,
  imageURL,
}: AddToWatchListProps) => {
  const handleClick = async () => {
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
