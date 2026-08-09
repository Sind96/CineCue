import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useMovieSearch } from "../../features/movies/hooks/useMovieSearch";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const movieSearchQuery = useMovieSearch(debouncedSearchTerm);

  const searchResults = (movieSearchQuery.data ?? []).slice(0, 10);
  const hasSearchTerm = debouncedSearchTerm.length > 0;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const handleSearch = () => {
    const normalisedSearchTerm = searchTerm.trim();

    if (
      normalisedSearchTerm === debouncedSearchTerm &&
      searchResults.length > 0
    ) {
      navigate(`/movie/${searchResults[0].imdbId}`);
    }
  };

  const handleMovieClick = (imdbId: string) => {
    setSearchTerm("");
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

      {hasSearchTerm && movieSearchQuery.isPending && (
        <div className="absolute mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-sm text-gray-300 shadow-lg z-50">
          Searching...
        </div>
      )}

      {hasSearchTerm && movieSearchQuery.isError && (
        <div className="absolute mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-sm text-red-400 shadow-lg z-50">
          Unable to search for movies.
        </div>
      )}

      {hasSearchTerm &&
        movieSearchQuery.isSuccess &&
        searchResults.length === 0 && (
          <div className="absolute mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-sm text-gray-300 shadow-lg z-50">
            No movies found.
          </div>
        )}

      {searchResults.length > 0 && (
        <ul className="absolute mt-2 w-full bg-secondary rounded-lg shadow-lg max-h-64 overflow-y-auto z-50 custom-scrollbar">
          {searchResults.map((movie) => (
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
