import { useEffect, useState } from "react";
import Navbar from "../components/NavBar/_Navbar";
import type { watchListType } from "../@types/watchList.page.type";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

const WatchListPage = () => {
  const [watchList, setWatchList] = useState<watchListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      } catch (error) {
        console.error("Error with fetchWatchList:", error);
        setWatchList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchList();
  }, [isAuthenticated, navigate]);

  const handleRemove = async (imdbId: string) => {
    try {
      await API.delete("/protected/watchlist");
      setWatchList((prev) => prev.filter((movie) => movie.imdbId !== imdbId));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // if (error.response && error.response.status === 400) {
      //   alert("Movie does not exist in watchlist.");
      // } else {
      console.error("Error with handleRemove:", error);
      alert("Something went wrong. Please try again later.");
      // }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h2>Your Watchlist</h2>
      {watchList.length === 0 ? (
        <p> No movies in your watchList.</p>
      ) : (
        <ul>
          {watchList.map((movie) => (
            <li key={movie.imdbId}>
              <span>{movie.title}</span>
              <button onClick={() => handleRemove(movie.imdbId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchListPage;
