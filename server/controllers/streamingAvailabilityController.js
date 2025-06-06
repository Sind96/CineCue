import * as streamingAvailability from "streaming-availability";
import dotenv from "dotenv";

dotenv.config();

export const streamingAvailabilityTitleApi = async (req, res) => {
  const { searchTerm } = req.body;

  const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=gb&title=${searchTerm}&series_granularity=show&show_type=movie&output_language=en`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return res.status(500).json(result);
  } catch (error) {
    console.log("Error with streamingAvailabilityApi:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const streamingAvailabilityGenreApi = async (req, res) => {
  const { genre } = req.params;
  const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=gb&genres=${genre}&order_direction=asc&order_by=rating&genres_relation=or&output_language=en&show_type=movie`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return res.status(200).json(result.shows);
  } catch (error) {
    console.log("Error with streamingAvailabilityApi:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const streamingAvailabilityimdbIdApi = async (req, res) => {
  const { imdbId } = req.params;
  const url = `https://streaming-availability.p.rapidapi.com/shows/${imdbId}?output_language=en&country=gb`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error with streamingAvailabilityimdbIdApi:", error);
    return res.status(500).json("Internal Server Error");
  }
};
