import { prisma } from "../lib/prisma.js";
import type { FavouriteInput } from "../validators/favourite.validator.js";
import { AppError } from "../utils/AppError.js";
import { mapToFavouriteResponse } from "../utils/favourite.mapper.js";
import { FavouriteResponse } from "../types/favourite.types.js";

export const addFavourite = async (
  userId: string,
  input: FavouriteInput,
): Promise<FavouriteResponse> => {
  const existingFavourite = await prisma.favourite.findUnique({
    where: {
      userId_imdbId: {
        userId,
        imdbId: input.imdbId,
      },
    },
  });

  if (existingFavourite) {
    throw new AppError(409, "Movie already in favourites");
  }

  const favourite = await prisma.favourite.create({
    data: {
      userId,
      imdbId: input.imdbId,
      title: input.title,
      posterUrl: input.posterUrl,
      releaseYear: input.releaseYear,
      rating: input.rating,
    },
  });

  return mapToFavouriteResponse(favourite);
};

export const getFavourites = async (
  userId: string,
): Promise<FavouriteResponse[]> => {
  const favourites = await prisma.favourite.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favourites.map(mapToFavouriteResponse);
};

export const deleteFavourite = async (userId: string, imdbId: string) => {
  return prisma.favourite.delete({
    where: {
      userId_imdbId: {
        userId,
        imdbId,
      },
    },
  });
};
