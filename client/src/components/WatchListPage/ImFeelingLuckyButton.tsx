import type { ImFeelingLuckyButtonProps } from "../../@types/watchList.page.type";
import { Bounce, toast } from "react-toastify";

const ImFeelingLuckyButton = ({ watchList }: ImFeelingLuckyButtonProps) => {
  const handlerImFeelingLucky = async () => {
    try {
      if (watchList.length > 0) {
        const randomMovie =
          watchList[Math.floor(Math.random() * watchList.length)];
        toast.success(`You should watch: ${randomMovie.title}`, {
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
        });
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
    <div>
      <button onClick={handlerImFeelingLucky}>I'm Feeling Lucky</button>
    </div>
  );
};

export default ImFeelingLuckyButton;
