import { useNavigate } from "react-router-dom";
import type { AddToWatchListProps } from "../../@types/movies.components.type";
import { useAuth } from "../../hooks/AuthContext";
import API from "../../services/axios";
import { Bounce, toast } from "react-toastify";

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
      toast.success("Movie has been added to watchlist!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.info("This movie is already in your watchlist.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Error with handleClick:", error);
        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  return <button onClick={handleClick}>Add to WatchList</button>;
};

export default AddToWatchListButton;
