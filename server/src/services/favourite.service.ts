import type { Favourite } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type { FavouriteInput } from "../validators/favourite.validator.js";
import { AppError } from "../utils/AppError.js";

export const addFavourite = async (
  userId: string,
  input: FavouriteInput,
): Promise<Favourite> => {
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

  return prisma.favourite.create({
    data: {
      userId,
      imdbId: input.imdbId,
      title: input.title,
      posterUrl: input.posterUrl,
      releaseYear: input.releaseYear,
      rating: input.rating,
    },
  });
};

export const getFavourites = async (userId: string) => {
  return prisma.favourite.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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
