import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { getEvents } from '@services/apiServices';
import { Link } from 'react-router-dom';
import IndividualMovie from '@pages/individualMovie';
import MovieImages from '@components/movieListItem';
import Spinner from '@components/spinner';
import { getTrendingEvents } from '@services/apiServices';
import { getComedyEvents } from '@services/apiServices';
import { getActionEvents } from '@services/apiServices';

export default function MovieList () {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [iMDBTopMovies, setiMDBTopMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect (() => {
    async function fetchData () {
      try {
        const events = await getEvents();
        const filterediMDBTopMovies = events.shows.filter((movie) => movie.rating >= 85);
        setiMDBTopMovies(filterediMDBTopMovies);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  } ,[]);

  useEffect(() => {
    async function fetchTrendingMovies () {
      try {
        const events = await getTrendingEvents();
        setTrendingMovies(events.shows);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching data:', e);
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    async function fetchComedyMovies () {
      try {
        const events = await getComedyEvents();
        setComedyMovies(events.shows);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching data:', e);
        setLoading(false);
      }
    }
    fetchComedyMovies();
  }, []);

  useEffect(() => {
    async function fetchActionMovies () {
      try {
        const events = await getActionEvents();
        setActionMovies(events.shows);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching data:', e);
        setLoading(false);
      }
    }
    fetchActionMovies();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.MovieList}>

      <div className={styles.IMDBTop10}>
        <p>IMDB Top 100</p>
      </div>  
      <div className={styles.VerticalImages}>
        {iMDBTopMovies.map(movie => (
          <li key={movie.imdbId}>
            <Link to={movie.imdbId}>
              <MovieImages src={movie.imageSet.verticalPoster.w720} alt={movie.title}/>
            </Link>
          </li>
        ))}
      </div>

      <div className={styles.TrendingNow}>
        <p>Trending Now</p>
      </div>  
      <div className={styles.HorizontalImages}>
        {trendingMovies.map(movie => (
          <li key={movie.imdbId}>
            <Link to={movie.imdbId}>
              <MovieImages src={movie.imageSet.horizontalPoster.w1440} alt={movie.title} />
            </Link>
          </li>
        ))}
      </div>

      <div className={styles.TrendingNow}>
        <p>Comedy Movies</p>
      </div>  
      <div className={styles.HorizontalImages}>
        {comedyMovies.map(movie => (
          <li key={movie.imdbId}>
            <Link to={movie.imdbId}>
              <MovieImages src={movie.imageSet.horizontalPoster.w1440} alt={movie.title} />
            </Link>
          </li>
        ))}
      </div>
      
      <div className={styles.TrendingNow}>
        <p>Action Movies</p>
      </div>  
      <div className={styles.HorizontalImages}>
        {actionMovies.map(movie => (
          <li key={movie.imdbId}>
            <Link to={movie.imdbId}>
              <MovieImages src={movie.imageSet.horizontalPoster.w1440} alt={movie.title} />
            </Link>
          </li>
        ))}
      </div>

      

    </div>
  );
}