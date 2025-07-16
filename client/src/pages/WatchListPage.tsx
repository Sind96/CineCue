import { useEffect, useState } from "react";
import Navbar from "../components/_universal/NavBar/_Navbar";
import type { watchListType } from "../@types/watchList.page.type";

const WatchListPage = () => {
  const [watchList, setWatchList] = useState<watchListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:3000/api/protected/watchlist",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Not authorised");
        const data = await res.json();
        console.log(data);
        setWatchList(data);
      } catch (error) {
        console.error("Error with fetchWatchList:", error);
        setWatchList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchList();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Watchlist</h2>
      {watchList.length === 0 ? (
        <p> No movies in your watchList.</p>
      ) : (
        <ul>
          {watchList.map((movie) => (
            <li key={movie.imdbId}>{movie.title}</li>
          ))}
        </ul>
      )}
      <Navbar />
    </div>
  );
};

export default WatchListPage;
