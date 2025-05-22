import AddToWatchList from '@components/addToWatchListButton';
import styles from './index.module.css';
import { MdOutlineStarOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvents } from '@services/apiServices';
import NavBar from '@components/navBar';
import Spinner from '@components/spinner';



export default function IndividualMovie ( ) {
  let { imdbId } = useParams();
  const [ movie, setMovie ] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  
  useEffect (() => {
    async function fetchData () {
      try {
        const events = await getEvents();
        const selectedImdbMovie = events.shows.find ((movie) => movie.imdbId === imdbId);
        setMovie(selectedImdbMovie);
      } catch (e) {
        console.log ('Error fetching data:', e);
      }
    }
    fetchData();
  } ,[imdbId]);
  
  if (!movie) {
    return <Spinner />;
  }


  return (
    

    <div className="individualMovieContainer">
      
      <img className={styles.backdrop} src={movie.imageSet.verticalBackdrop.w720} />
      <div className={styles.blackBackground}></div>
      
      <div className={styles.movieDetails}>
        <div className={styles.movieDetailsNameGenreRating}>
          <div className={styles.movieDetailsNameAndGenre}>
            <p className={styles.movieTitle}>{movie.title}</p> 
            <p className={styles.genre}>Genre: {movie.genres[0].name}</p>
          </div>
          <p className={styles.ratings}><span className={styles.icon}><MdOutlineStarOutline /></span>({movie.rating}/100)</p>
        </div>
        <p className={styles.overView}>{movie.overview}</p>
        <p className={styles.directors}>Director: {movie.directors}</p>
        <p className={styles.cast}>Stars: {movie.cast.join(', ')}</p>
        <div className={styles.ottbuttonandp}>
          <div className={styles.ottbuttonandp}>
            <p>Watch Now On:</p>
            <a href={movie.streamingOptions.gb[1].link}>
              <img className={styles.ottbuttonimage} src={movie.streamingOptions.gb[1].service.imageSet.lightThemeImage} />
            </a>
          </div>
        </div>
        <AddToWatchList movie={movie} className={styles.AddButton}/>
      </div>
      <NavBar />
    </div>
    
  );
}