import { useNavigate } from "react-router-dom";
import type { AddToWatchListProps } from "../../@types/movies.components.type";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Bounce, toast } from "react-toastify";
import { Plus } from "lucide-react";
import { apiClient } from "../../lib/apiClient";

const AddToWatchListButton = ({
  imdbId,
  title,
  imageURL,
}: AddToWatchListProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!user) {
      alert("Please login to add to watchlist.");
      navigate("/signin");
      return;
    }
    try {
      await apiClient.post("/protected/watchlist", {
        imdbId,
        title,
        imageURL,
      });
      toast.success("Movie has been added to watchlist!", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.info("This movie is already in your watchlist.", {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        console.error("Error with handleClick:", error);
        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-xl shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
    >
      <Plus size={20} />
      Add to WatchList
    </button>
  );
};

export default AddToWatchListButton;
