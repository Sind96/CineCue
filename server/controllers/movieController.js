import dotenv from "dotenv";

dotenv.config();

export const apiMovieCall = async (req, res) => {
  const query = req.query.q;
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: { title: query },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.log("Error with apiMovieCall", error);
    res.status(500).json("Internal Server Error");
  }
};
