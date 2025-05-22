import styles from '@components/imFeelingLuckyButton/index.module.css';

export default function ImFeelingLuckyButton ( { moviesList } ) {
  async function handlerImFeelingLucky () {
    if (moviesList.length > 0) {
      const randomMovie = moviesList[Math.floor(Math.random() * moviesList.length)];
      alert(`You should watch: ${randomMovie.title}`);
    } else {
      alert('No movies available in your watchlist.');  }
  }

  return (
    <div className={styles.ImFeelingLuckyButtonContainer}>
      <button onClick={handlerImFeelingLucky} className={styles.SearchBar2}>I'm Feeling Lucky</button>
    </div>
  );
}