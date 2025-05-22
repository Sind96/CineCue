/* eslint-disable react/prop-types */
import { addToFavouriteList } from '@services/apiServices(backEnd)';
import styles from './index.module.css';

export default function AddToWatchList ( { movie } ) {
  
  async function addingToDb () {
    console.log(movie,'addtowatch');
    try {
      const resp = await addToFavouriteList( movie);
    } catch (e) {
      console.log('There has been an error with addingToDb:', e);
    }
  }

  return (
    <div className={styles.addToWatchListButtonContainer}>
      <button onClick={()=>addingToDb()}className={styles.addToWatchListButton}>Add to Watchlist!</button>
    </div>
  );
}