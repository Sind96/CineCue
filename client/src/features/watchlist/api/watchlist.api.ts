import { apiClient } from "../../../lib/apiClient";
import type {
  AddToWatchlistInput,
  AddToWatchlistResponse,
  WatchlistItem,
  WatchlistResponse,
} from "../types/watchlist.types";

export const getWatchlist = async (): Promise<WatchlistItem[]> => {
  const { data } = await apiClient.get<WatchlistResponse>("/watchlist");

  return data.watchlist;
};

export const addToWatchlist = async (
  input: AddToWatchlistInput,
): Promise<WatchlistItem> => {
  const { data } = await apiClient.post<AddToWatchlistResponse>(
    "/watchlist",
    input,
  );

  return data.watchlistItem;
};

export const removeFromWatchlist = async (imdbId: string): Promise<void> => {
  await apiClient.delete(`/watchlist/${imdbId}`);
};
