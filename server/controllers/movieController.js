import dotenv from "dotenv";

dotenv.config();

export const apiMovieCall = async (req, res) => {
  const { query } = req.body;

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
    console.log(result);
  } catch (error) {
    console.log("Error with apiMovieCall", error);
    res.status(500).json("Internal Server Error");
  }
};
