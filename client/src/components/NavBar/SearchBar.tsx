import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import type { streamingAvailabilityProps } from "../../@types/streamingAvailability/_streamingAvailability.type";
import { useNavigate } from "react-router-dom";

let debounceTimeout: NodeJS.Timeout;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<
    streamingAvailabilityProps[]
  >([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 200);
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
        setFilteredMovies(filteredItems.slice(0, 10));
      } catch (error) {
        console.error("Error with fetchMovies:", error);
      }
    };
    fetchMovies();
  }, [debouncedSearchTerm]);

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
    <div className="relative w-full">
      <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary transition">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            if (value.trim() === "") {
              setFilteredMovies([]);
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="bg-transparent flex-1 text-sm text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <CiSearch size={20} />
        </button>
      </div>

      {filteredMovies.length > 0 && (
        <ul className="absolute mt-2 w-full bg-secondary rounded-lg shadow-lg max-h-64 overflow-y-auto z-50 custom-scrollbar">
          {filteredMovies.map((movie) => (
            <li
              key={movie.imdbId}
              onClick={() => handleMovieClick(movie.imdbId)}
              className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer transition"
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
