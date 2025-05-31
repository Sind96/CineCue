import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import type { searchResultsType } from "../../@types/movies.components.type";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([]); 

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
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (error) {
      console.log("Error with handleSearch", error);
    }
  };

  return (
    <div>
      <div>
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
          <li key={movie.id}>{movie.titleText.text}</li>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
