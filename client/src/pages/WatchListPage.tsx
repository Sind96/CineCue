import { useEffect, useState } from "react";
import Navbar from "../components/NavBar/_Navbar";
import ImFeelingLuckyButton from "../components/WatchListPage/ImFeelingLuckyButton";
import type { watchListType } from "../@types/watchList.page.type";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { Bounce, toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";

const WatchListPage = () => {
  const [watchList, setWatchList] = useState<watchListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const res = await API.get("/protected/watchlist");
        setWatchList(res.data);
        setError(null);
      } catch (error) {
        console.error("Error with fetchWatchList:", error);
        setError("Failed to load watchlist. Please try again.");
        setWatchList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchList();
  }, [navigate]);

  const handleRemove = async (imdbId: string) => {
    try {
      setDeleting(imdbId);
      await API.delete("/protected/watchlist", {
        data: { imdbId },
      });
      setWatchList((prev) => prev.filter((movie) => movie.imdbId !== imdbId));
      toast.success("Movie removed from watchlist", {
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
      if (error.response && error.response.status === 400) {
        toast.error("Movie does not exist in watchlist.", {
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
        console.error("Error with handleRemove:", error);
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
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-100 bg-secondary">
        {" "}
        <ScaleLoader color="#e50914" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground mt-10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Watchlist</h2>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : watchList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              You haven't added any movies yet.
            </p>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchList.map((movie) => (
              <li key={movie.imdbId} className="relative group">
                <Link to={`/movie/${movie.imdbId}`}>
                  <img
                    src={movie.imageURL}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <button
                  onClick={() => handleRemove(movie.imdbId)}
                  disabled={deleting === movie.imdbId}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-600/80 text-white shadow hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  {deleting === movie.imdbId ? (
                    <span className="text-xs">...</span>
                  ) : (
                    <MdDelete className="h-5 w-5" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {watchList.length > 0 && (
          <div className="mt-12 flex justify-center">
            <ImFeelingLuckyButton watchList={watchList} />
          </div>
        )}
      </main>
    </div>
  );
};

export default WatchListPage;
