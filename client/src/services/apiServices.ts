import * as streamingAvailability from "streaming-availability";

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY || "";

export const getEvents = async () => {
  try {
    const client = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: RAPID_API_KEY,
      })
    );

    const data = await client.showsApi.searchShowsByFilters({
      country: "gb",
      showType: "movie",
      // rating_min: "85",
      orderBy: "rating",
      yearMin: 1970,
      orderDirection: "desc",
    });
    return data;
  } catch (error) {
    console.log("There has been an error fetching data:", error);
  }
};

export const getTrendingEvents = async () => {
  try {
    const client = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: RAPID_API_KEY,
      })
    );

    const data = await client.showsApi.searchShowsByFilters({
      country: "gb",
      showType: "movie",
      // rating_min: "60",
      orderBy: "rating",
      yearMin: 2024,
      orderDirection: "desc",
    });
    return data;
  } catch (error) {
    console.log("There has been an error fetching data:", error);
  }
};

export const getComedyEvents = async () => {
  try {
    const client = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: RAPID_API_KEY,
      })
    );

    const data = await client.showsApi.searchShowsByFilters({
      country: "gb",
      showType: "movie",
      ratingMin: 60,
      orderBy: "rating",
      yearMin: 1970,
      orderDirection: "desc",
      genres: ["comedy"],
    });
    return data;
  } catch (error) {
    console.log("There has been an error fetching data:", error);
  }
};

export const getActionEvents = async () => {
  try {
    const client = new streamingAvailability.Client(
      new streamingAvailability.Configuration({
        apiKey: RAPID_API_KEY,
      })
    );

    const data = await client.showsApi.searchShowsByFilters({
      country: "gb",
      showType: "movie",
      ratingMin: 60,
      orderBy: "rating",
      yearMin: 1970,
      orderDirection: "desc",
      genres: ["action"],
    });
    return data;
  } catch (error) {
    console.log("There has been an error fetching data:", error);
  }
};
