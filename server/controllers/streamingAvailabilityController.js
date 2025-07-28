import * as streamingAvailability from "streaming-availability";
import dotenv from "dotenv";
import { GENRES } from "../utils/constants.js";

dotenv.config();

// Retrieve IMDB top 100 movies
const top20Cache = {};

export const getTop20IMDBMovies = async (req, res) => {
  try {
    if (top20Cache["top20"]) {
      return res.status(200).json(top20Cache["top20"]);
    }

    const client = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: process.env.X_RAPIDAPI_KEY,
      })
    );

    const data = await client.showsApi.searchShowsByFilters({
      country: "gb",
      showType: "movie",
      rating_min: "85",
      orderBy: "rating",
      yearMin: 1970,
      orderDirection: "desc",
      page: 1,
      pageSize: 40,
    });
    const result = data.shows;
    top20Cache["top20"] = result;
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error with getTop20IMDBMovies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve Movies by Title
const titleCache = {};

export const getMoviesByTitle = async (req, res) => {
  const { searchTerm } = req.body;

  if (titleCache[searchTerm]) {
    return res.status(200).json(titleCache[searchTerm]);
  }

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
    titleCache[searchTerm] = result;

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error with getMoviesByTitle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve Movies by Genre
const genreCache = {};

export const getAllMoviesByGenre = async (req, res) => {
  try {
    const result = [];

    for (const genre of GENRES) {
      if (genreCache[genre]) {
        result.push({ genre, movies: genreCache[genre] });
        continue;
      }
      const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=gb&genres=${genre}&order_direction=desc&order_by=rating&genres_relation=or&output_language=en&show_type=movie`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        console.error(`Failed to fetch for genre:${genre}`);
        continue;
      }
      const data = await response.json();
      const movies = data?.shows || [];
      genreCache[genre] = movies;
      result.push({ genre, movies });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error with getMoviesByGenre:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve Movies by IMDBId
const imdbCache = {};

export const getMoviesByImdbId = async (req, res) => {
  const { imdbId } = req.params;

  if (imdbCache[imdbId]) {
    return res.status(200).json(imdbCache[imdbId]);
  }

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
    imdbCache[imdbId] = result;

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error with getMoviesByImdbId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
