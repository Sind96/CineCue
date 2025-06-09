import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import type { streamingAvailabilityProps } from "../../../@types/streamingAvailability/_streamingAvailability.type";
import { useNavigate } from "react-router-dom";

let debounceTimeout: NodeJS.Timeout;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<
    streamingAvailabilityProps[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 500);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/title`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm: debouncedSearchTerm }),
        });
        const data: streamingAvailabilityProps[] = await response.json();

        const filteredItems = data.filter((movie) =>
          movie.title
            .toLowerCase()
            .startsWith(debouncedSearchTerm.toLowerCase())
        );
        setFilteredMovies(filteredItems.slice(0, 8));
      } catch (error) {
        console.error("Error with fetchMovies:", error);
      }
    };
    fetchMovies();
  }, [debouncedSearchTerm]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchTerm(e.target.value);
    } catch (error) {
      console.error("Error with handleInputChange:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (filteredMovies.length > 0) {
        navigate(`/movie/${filteredMovies[0].imdbId}`);
      }
    } catch (error) {
      console.error("Error with handleSearch", error);
    }
  };

  const handleMovieClick = (imdbId: string) => {
    setSearchTerm("");
    setFilteredMovies([]);
    navigate(`/movie/${imdbId}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>
          <CiSearch />
        </button>
      </div>

      {filteredMovies.length > 0 && (
        <ul>
          {filteredMovies.map((movie) => (
            <li
              key={movie.imdbId}
              onClick={() => handleMovieClick(movie.imdbId)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
