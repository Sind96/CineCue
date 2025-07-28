import { useEffect, useState } from "react";
import Navbar from "../components/NavBar/_Navbar";
import type { watchListType } from "../@types/watchList.page.type";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import { Bounce, toast } from "react-toastify";

const WatchListPage = () => {
  const [watchList, setWatchList] = useState<watchListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchList = async () => {
      if (!isAuthenticated) {
        navigate("/signin");
        return;
      }
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
  }, [isAuthenticated, navigate]);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h2>Your Watchlist</h2>
      {loading ? (
        <p>Loading your playlist</p>
      ) : error ? (
        <p>{error}</p>
      ) : watchList.length === 0 ? (
        <p> No movies in your watchList.</p>
      ) : (
        <ul>
          {watchList.map((movie) => (
            <li key={movie.imdbId}>
              <span>{movie.title}</span>
              <button
                onClick={() => handleRemove(movie.imdbId)}
                disabled={deleting === movie.imdbId}
              >
                {deleting === movie.imdbId ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchListPage;
