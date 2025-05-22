import SearchBar from '@components/searchBar';
import styles from './index.module.css';
import MovieList from '@components/movieList';
import TitleAndLogo from '@components/titleAndLogo';
import NavBar from '@components/navBar';
import Spinner from '@components/spinner';

export default function Homepage () {
  const text = (<p id={styles.LargeText1}>WhatTo<span className={styles.redFont}>Watch</span>?</p>);
  
  if (!<MovieList />) {
    return <Spinner />;
  } 

  return (
    <div className="HomepageContainer">
      <TitleAndLogo text={text}/>  
      <SearchBar />
      <MovieList />
      <NavBar />
    </div>
  );
}