import type { Favourite } from "../../generated/prisma/client.js";
import type { FavouriteResponse } from "../types/favourite.types.js";

export const mapToFavouriteResponse = (
  favourite: Favourite,
): FavouriteResponse => {
  return {
    imdbId: favourite.imdbId,
    title: favourite.title,
    posterUrl: favourite.posterUrl,
    releaseYear: favourite.releaseYear,
    rating: favourite.rating,
  };
};
