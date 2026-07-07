import { z } from "zod";

export const favouriteSchema = z.object({
  imdbId: z.string().min(1, "IMDb ID is required"),
  title: z.string().min(1, "Title is required"),
  posterUrl: z.url().optional(),
  releaseYear: z.number().int().optional(),
  rating: z.number().int().optional(),
});

export type FavouriteInput = z.infer<typeof favouriteSchema>;
