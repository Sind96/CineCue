import dotenv from "dotenv";
dotenv.config();

export const apiMoviesDatabase = async (req, res) => {
  const { query } = req.body;

  if (!query)
    return res.status(400).json({ message: "Missing movie title query" });

  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}?exact=false&titleType=movie`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return res.json(result.results);
  } catch (error) {
    console.log("Error with apiMovieCall", error);
    res.status(500).json("Internal Server Error");
  }
};
