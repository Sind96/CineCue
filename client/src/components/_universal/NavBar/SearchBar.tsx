import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import type { streamingAvailabilityProps } from "../../../@types/streamingAvailability/_streamingAvailability.type";
import { useNavigate } from "react-router-dom";
// import type { searchResultsType } from "../../../@types/movies.components.type";
// import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    streamingAvailabilityProps[]
  >([]);
  const [filteredMovies, setFilteredMovies] = useState<
    streamingAvailabilityProps[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stream/title`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        });
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log("Error with fetchMovies:", error);
      }
    };
    fetchMovies();
  }, [searchTerm]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const searchTerm = e.target.value;

      if (!searchTerm.length) {
        setFilteredMovies([]);
        setSearchTerm("");
        return true;
      }
      setSearchTerm(searchTerm);

      const filteredItems = searchResults.filter((movie) =>
        movie.title.toLowerCase().startsWith(newTerm.toLowerCase())
      );
      setFilteredMovies(filteredItems.slice(0, 5));
    } catch (error) {
      console.log("Error with handleInputChange:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const imdbId = searchResults.imdbId;
      navigate(`/movie/${imdbId}`);
    } catch (error) {
      console.log("Error with handleSearch", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Seach for a movie..."
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleSearch}
        />
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchBar;
