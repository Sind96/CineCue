import styles from './index.module.css';
import CircumIcon from '@klarr-agency/circum-icons-react';
import SearchIcon from './SearchIcon.jpg';
import { useState, useEffect } from 'react';
import { getEvents } from '@services/apiServices';
import { useNavigate } from 'react-router-dom';


export default function SearchBar () {

  const [apiMovies, setapiMovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [ searchMovie,setSearchMovie]=useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate ();


  useEffect (() => {
    async function fetchData () {
      try {
        const events = await getEvents();
        const movieArray = events.shows;
   
        setapiMovies(movieArray);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    }
    fetchData();
  } ,[]);
  // console.log(apiMovies);



  function handleInputChange (e) {
    const searchTerm = e.target.value;

    if (searchTerm.length === 0) {
      setFilteredMovies([]);
      setSearchItem('');
      return true;
    }
    setSearchItem(searchTerm);

    const filteredItems = apiMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredMovies(filteredItems.slice(0,5));
  }

  function handlerClickOnMovie (movie) {
    setSearchMovie(movie);
    setSearchItem(movie.title);
    setFilteredMovies([]);
  }
  
  function searchTheMovie () {
    const imdbId = searchMovie.imdbId;
    navigate(`/homepage/${imdbId}`);
  }


  return (
    <div>
      <div className={styles.SearchContainer}>
        <input className={styles.SearchBar} type="text" placeholder="Seach for a movie..."  onChange={handleInputChange} value={searchItem}/>
        <img src={SearchIcon} className={styles.SearchIcon} onClick={searchTheMovie}/>
      </div>
      <div className={styles.searchingMovies} >
        {filteredMovies.map((movie) => (
          <h1 onClick={()=>handlerClickOnMovie(movie)} key={movie.imdbId}>{ movie.title }</h1>
        ))}
      </div>
    </div>
  );
}