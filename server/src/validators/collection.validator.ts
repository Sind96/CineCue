import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
  description: z.string().optional(),
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;

export const addMovieToCollectionSchema = z.object({
  imdbId: z.string().min(1, "IMDb ID is required"),
  title: z.string().min(1, "Title is required"),
  year: z.number().int().optional(),
  posterUrl: z.url().optional(),
  overview: z.string().optional(),
  runtimeMinutes: z.number().int().positive().optional(),
  genres: z.array(z.string()).default([]),
  externalSource: z.string().min(1, "External source is required"),
});

export type AddMovieToCollectionInput = z.infer<
  typeof addMovieToCollectionSchema
>;
