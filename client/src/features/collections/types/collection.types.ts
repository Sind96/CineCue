export type CollectionVisibility = "PRIVATE" | "SHARED" | "PUBLIC";

export type CollectionSummary = {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  visibility: CollectionVisibility;
  createdAt: string;
  updatedAt: string;
};

export type CollectionMovieDetails = {
  id: string;
  imdbId: string;
  title: string;
  year: number | null;
  posterUrl: string | null;
  overview: string | null;
  runtimeMinutes: number | null;
  genres: string[];
  externalSource: string;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CollectionMovie = {
  id: string;
  collectionId: string;
  movieId: string;
  addedById: string;
  watched: boolean;
  watchedAt: string | null;
  rating: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  movie: CollectionMovieDetails;
};

export type CollectionDetail = CollectionSummary & {
  movies: CollectionMovie[];
};

export type CreateCollectionInput = {
  name: string;
  description?: string;
};

export type AddMovieToCollectionInput = {
  imdbId: string;
  title: string;
  year?: number;
  posterUrl?: string;
  overview?: string;
  runtimeMinutes?: number;
  genres: string[];
  externalSource: string;
};

export type CollectionsResponse = {
  collections: CollectionSummary[];
};

export type CollectionResponse = {
  collection: CollectionDetail;
};

export type CreateCollectionResponse = {
  collection: CollectionSummary;
};

export type AddMovieToCollectionResponse = {
  collectionMovie: CollectionMovie;
};

export type UpdateCollectionInput = {
  name?: string;
  description?: string;
};
