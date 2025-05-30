import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // console.log("This is searchTerm:", searchTerm);
  const [searchResults, setSearchResults] = useState();
  // console.log("This is searchResults:", searchResults);

  const handleSearch = async () => {
    const response = await axios.get(`/call`, {
      data: {
        query: searchTerm,
      },
    });
    console.log("This is response", response);
    // console.log("test", response.json(response.data);)
    setSearchResults(response.data.results);
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
      {/* <div>
        {searchResults.map((movie) => (
          <li key={movie.imdbId}>
            {movie.title} </li>>
        )}
      </div> */}
    </div>
  );
};

export default SearchBar;
