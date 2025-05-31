const AddToWatchList = () => {
  const addMovieToFavourites = async () => {
    try {
      // const response = await
    } catch (error) {
      console.log("Error with addMovieToFavourites:", error);
    }
  };

  return (
    <div>
      <button onClick={() => addMovieToFavourites()}>Add to Watchlist!</button>
    </div>
  );
};

export default AddToWatchList;
