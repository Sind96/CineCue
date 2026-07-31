export type WatchlistItem = {
  imdbId: string;
  title: string;
  posterUrl?: string | null;
  releaseYear?: number | null;
  rating?: number | null;
};

export type AddToWatchlistInput = {
  imdbId: string;
  title: string;
  posterUrl?: string;
  releaseYear?: number;
  rating?: number;
};

export type AddToWatchlistResponse = {
  watchlistItem: WatchlistItem;
};

export type WatchlistResponse = {
  watchlist: WatchlistItem[];
};

export type AddToWatchlistButtonProps = {
  imdbId?: string;
  title?: string;
  posterUrl?: string;
  releaseYear?: number;
  rating?: number;
};

export type ImFeelingLuckyButtonProps = {
  watchList: WatchlistItem[];
};
