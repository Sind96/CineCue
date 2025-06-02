import * as streamingAvailability from "streaming-availability";
import dotenv from "dotenv";

export const streamingAvailabilityApi = async (req, res) => {
  const { genre } = req.params;
  const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=gb&genres=${genre}&order_direction=asc&order_by=rating&genres_relation=or&output_language=en&show_type=movie`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c17209a989msh99a90a2cefb1ff7p1a1912jsn62171610f641",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error with streamingAvailabilityApi:", error);
    res.status(500).json("Internal Server Error");
  }
};
