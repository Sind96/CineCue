import { prisma } from "../lib/prisma.js";
import type { WatchlistInput } from "../validators/watchlist.validator.js";
import { AppError } from "../utils/AppError.js";
import { mapToWatchlistResponse } from "../utils/watchlist.mapper.js";
import type { WatchlistResponse } from "../types/watchlist.types.js";

export const addToWatchlist = async (
  userId: string,
  input: WatchlistInput,
): Promise<WatchlistResponse> => {
  const existingWatchlistItem = await prisma.watchlist.findUnique({
    where: {
      userId_imdbId: {
        userId,
        imdbId: input.imdbId,
      },
    },
  });

  if (existingWatchlistItem) {
    throw new AppError(409, "Movie already in watchlist");
  }

  const watchlistItem = await prisma.watchlist.create({
    data: {
      userId,
      imdbId: input.imdbId,
      title: input.title,
      posterUrl: input.posterUrl,
      releaseYear: input.releaseYear,
      rating: input.rating,
    },
  });

  return mapToWatchlistResponse(watchlistItem);
};

export const getWatchlist = async (
  userId: string,
): Promise<WatchlistResponse[]> => {
  const watchlist = await prisma.watchlist.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return watchlist.map(mapToWatchlistResponse);
};

export const removeFromWatchlist = async (
  userId: string,
  imdbId: string,
): Promise<void> => {
  await prisma.watchlist.delete({
    where: {
      userId_imdbId: {
        userId,
        imdbId,
      },
    },
  });
};
