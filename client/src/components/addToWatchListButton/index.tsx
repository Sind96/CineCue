import { addToFavouriteList } from "../../services/apiServices(backEnd).ts";
import styles from "./index.module.css";

const AddToWatchList = ({ movie }: any) => {
  const addingToDb = async () => {
    try {
      await addToFavouriteList(movie);
    } catch (error) {
      console.log("There has been an error with addingToDb:", error);
    }
  };

  return (
    <div className={styles.addToWatchListButtonContainer}>
      <button
        onClick={() => addingToDb()}
        className={styles.addToWatchListButton}
      >
        Add to Watchlist!
      </button>
    </div>
  );
};

export default AddToWatchList;
