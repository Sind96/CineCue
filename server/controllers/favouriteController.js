import favouriteList from "../model/Favourite.js";

export const fetchMoviesFromFavouriteList = async (req, res) => {
  try {
    const response = await favouriteList.find({}).select();
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error with fetchMoviesFromFavouriteList:`, error);
    res.status(500).json(`Internal Server Error`);
  }
};

export const addMovieToFavouriteList = async (req, res) => {
  try {
    const { imdbId, title, imageURL } = req.body;
    if (!imdbId || !title || !imageURL)
      return res.status(400).json("Missing required movie data");
    const response = await favouriteList.create({ imdbId, title, imageURL });
    res
      .status(200)
      .json({ msg: `The requested movie has been added: ${response}` });
  } catch (error) {
    console.log(`Error with addMovieToFavouriteList:`, error);
    res.status(500).json(`Internal Server Error`);
  }
};

export const removeMovieFromFavouriteList = async (req, res) => {
  try {
    const { imdbId } = req.params;
    const response = await deleteOne({ imdbId: imdbId });
    return res.status(500).json(`Successfully deleted ${imdbId} from list`);
  } catch (error) {
    console.log(`Error with removeMovieFromFavouriteList:`, error);
    res.status(500).json(`Internal Server Error`);
  }
};
