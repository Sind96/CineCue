import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
// import type { searchResultsType } from "../../../@types/movies.components.type";
// import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  // const [searchResults, setSearchResults] = useState<searchResultsType[]>([]);

  useEffect(() => {
    
  }, [])

  const handleInputChange = async (e) => {
    try {
      const searchTerm = e.target.value;

      if (!searchTerm.length) {
        setFilteredMovies([]);
        setSearchTerm("");
        return true;
      }
      setSearchTerm(searchTerm);

      const filteredItems = 
    } catch (error) {
      console.log("Error with handleInputChange:", error);
    }
  };

  const handleSearch = async () => {
    try {
      console.log("test");
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
        />
        <CiSearch onClick={handleSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
