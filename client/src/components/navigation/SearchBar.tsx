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
      <div className="flex items-center rounded-full border border-border bg-surface px-4 py-2 shadow-sm transition focus-within:border-primary">
        <CiSearch className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      {hasSearchTerm && movieSearchQuery.isPending && (
        <div className="absolute mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground shadow-card z-50">
          Searching...
        </div>
      )}

      {hasSearchTerm && movieSearchQuery.isError && (
        <div className="absolute mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-red-500 shadow-card z-50">
          Unable to search for movies.
        </div>
      )}

      {hasSearchTerm &&
        movieSearchQuery.isSuccess &&
        searchResults.length === 0 && (
          <div className="absolute mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground shadow-card z-50">
            No movies found.
          </div>
        )}

      {searchResults.length > 0 && (
        <ul className="absolute mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-border bg-surface py-2 shadow-card z-50 custom-scrollbar">
          {searchResults.map((movie) => (
            <li
              key={movie.imdbId}
              onClick={() => handleMovieClick(movie.imdbId)}
              className="cursor-pointer px-4 py-2.5 text-sm text-foreground transition hover:bg-surface-elevated"
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
