import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import type { searchResultsType } from "../../../@types/movies.components.type";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([]);
  console.log(
    "Thus is search results",
    searchResults.map((i) => i.id)
  );

  const handleSearch = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const data = await response.json();
      setSearchResults(data);
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CiSearch onClick={handleSearch} />
      </div>
      <div>
        {searchResults.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <li>{movie.titleText.text}</li>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
