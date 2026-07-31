import { useNavigate } from "react-router-dom";
import type { AddToWatchlistButtonProps } from "../../features/watchlist/types/watchlist.types";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useAddToWatchlist } from "../../features/watchlist/hooks/useAddToWatchlist";
import { Bounce, toast } from "react-toastify";
import { Plus } from "lucide-react";
import axios from "axios";

const AddToWatchListButton = ({
  imdbId,
  title,
  posterUrl,
  releaseYear,
  rating,
}: AddToWatchlistButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addMutation = useAddToWatchlist();

  const handleClick = () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    if (!imdbId || !title) {
      toast.error("Movie details are unavailable.");
      return;
    }

    addMutation.mutate(
      {
        imdbId,
        title,
        posterUrl,
        releaseYear,
        rating,
      },
      {
        onSuccess: () => {
          toast.success("Movie has been added to your watchlist!", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce,
          });
        },

        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            toast.info("This movie is already in your watchlist.", {
              position: "top-center",
              autoClose: 1500,
              theme: "dark",
              transition: Bounce,
            });

            return;
          }

          toast.error("Something went wrong. Please try again later.", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce,
          });
        },
      },
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={addMutation.isPending}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
    >
      <Plus size={20} />
      {addMutation.isPending ? "Adding..." : "Add to Watchlist"}
    </button>
  );
};

export default AddToWatchListButton;
