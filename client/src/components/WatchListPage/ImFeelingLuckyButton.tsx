import { Link } from "react-router-dom";
import type { ImFeelingLuckyButtonProps } from "../../@types/watchList.page.type";
import { Bounce, toast } from "react-toastify";

const ImFeelingLuckyButton = ({ watchList }: ImFeelingLuckyButtonProps) => {
  const handlerImFeelingLucky = async () => {
    try {
      if (watchList.length > 0) {
        const randomMovie =
          watchList[Math.floor(Math.random() * watchList.length)];
        toast.success(
          <span>
            🎬 You should watch:{" "}
            <Link to={`/movie/${randomMovie.imdbId}`} className="underline">
              {" "}
              {randomMovie.title}`
            </Link>
          </span>,
          {
            toastId: "imfeeling-lucky",
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      } else {
        toast.info(`No movies available in your watchlist.`, {
          toastId: "imfeeling-lucky-info",
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
    } catch (error) {
      console.error("Error with handlerImFeelingLucky:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handlerImFeelingLucky}
        className="
          relative px-6 py-3 
          text-white font-semibold text-lg 
          rounded-full shadow-lg
          bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
          hover:from-yellow-500 hover:via-red-500 hover:to-pink-500
          transition-all duration-300 
          transform hover:scale-105 active:scale-95
        "
      >
        🎲 I'm Feeling Lucky
      </button>
    </div>
  );
};

export default ImFeelingLuckyButton;
