import TitleAndLogo from '@components/titleAndLogo';
import styles from './index.module.css';
import ImFeelingLuckyButton from '@components/imFeelingLuckyButton';
import NavBar from '@components/navBar';
import AddToWatchList from '@components/addToWatchListButton';
import { useState,useEffect } from 'react';
import { getFavouriteList } from '@services/apiServices(backEnd)';
import MovieListItem from '@components/movieListItem';

export default function WatchList () {
  const text2 = <p id={styles.LargeText1}>Watch<span className={styles.redFont}>List</span></p>;

  const [ moviesList, setMoviesList ] = useState([]);
  console.log(moviesList);

  useEffect(() => {
    console.log('effect');
    async function movielist () {
      const events = await getFavouriteList();
      setMoviesList(events);
      
    }
    movielist();
  }, []);

  return (
    <div className={styles.WatchList}>
      <TitleAndLogo text={text2} />
      <ImFeelingLuckyButton moviesList={moviesList}/>

      <div className={styles.watchListIndividualContainer}> 
        {moviesList.map((movie) => (
          <MovieListItem key={movie.imdbId} src={movie.imageURL} alt={movie.title} /> 
        ))}
      </div>

      <NavBar />
    </div>
  );
}