import movieList from "../model/movies.js";

export const fetchAllMovies = async (req, res) => {
  try {
    const response = await movieList.find({}).select();
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error with fetchAllMovies:`, error);
    res.status(500).json(`Internal Server Error`);
  }
};

export const addMovie = async (req, res) => {
  try {
    const { imdbId } = req.body;
    if (!imdbId) return res.status(400).json("Missing imdbId");
    const response = await movieList.create(imdbId);
    res
      .status(200)
      .json({ msg: `The requested movie has been added: ${response}` });
  } catch (error) {
    console.log(`Error with addMovie:`, error);
    res.status(500).json(`Internal Server Error`);
  }
};

export const removeMovie = async (req, res) => {
  try {
    const { imdbId } = req.params;
    const response = await deleteOne({ imdbId: imdbId });
    return res.status(500).json(`Successfully deleted ${imdbId} from list`);
  } catch (error) {
    console.log(`Error with removeMovie:`, error);
    res.status(500).json(`Internal Server Error`);
  }
};
