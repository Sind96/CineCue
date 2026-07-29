import type { Watchlist } from "../../generated/prisma/client.js";
import type { WatchlistResponse } from "../types/watchlist.types.js";

export const mapToWatchlistResponse = (
  watchlist: Watchlist,
): WatchlistResponse => {
  return {
    imdbId: watchlist.imdbId,
    title: watchlist.title,
    posterUrl: watchlist.posterUrl,
    releaseYear: watchlist.releaseYear,
    rating: watchlist.rating,
  };
};
