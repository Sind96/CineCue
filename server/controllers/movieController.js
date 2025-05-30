import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const apiMovieCall = async (req, res) => {
  const query = req.body.query;
  console.log("This is query:", query);

  const options = {
    method: "GET",
    url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}`,
    params: {
      exact: "false",
      titleType: "movie",
    },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const jsonResponse = res.json(response.data);
    console.log(jsonResponse);
  } catch (error) {
    console.log("Error with apiMovieCall", error);
    res.status(500).json("Internal Server Error");
  }
};
