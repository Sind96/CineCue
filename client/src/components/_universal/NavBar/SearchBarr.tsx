// import { useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import type { searchResultsType } from "../../../@types/movies.components.type";
// import { Link } from "react-router-dom";

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState<searchResultsType[]>([]);

//   const handleSearch = async () => {
//     try {
//       console.log("test");
//     } catch (error) {
//       console.log("Error with handleSearch", error);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between">
//         <input
//           type="text"
//           placeholder="Seach for a movie..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <CiSearch onClick={handleSearch} />
//       </div>
//       <div>
//         {searchResults.map((movie) => (
//           <Link to={`/movie/${movie.id}`} key={movie.id}>
//             <li>{movie.titleText.text}</li>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
