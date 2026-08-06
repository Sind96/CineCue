import { apiClient } from "../../../lib/apiClient";
import type {
  AddMovieToCollectionInput,
  AddMovieToCollectionResponse,
  CollectionDetail,
  CollectionMovie,
  CollectionResponse,
  CollectionSummary,
  CollectionsResponse,
  CreateCollectionInput,
  CreateCollectionResponse,
} from "../types/collection.types";

export const getCollections = async (): Promise<CollectionSummary[]> => {
  const { data } = await apiClient.get<CollectionsResponse>("/collections");

  return data.collections;
};

export const getCollection = async (
  collectionId: string,
): Promise<CollectionDetail> => {
  const { data } = await apiClient.get<CollectionResponse>(
    `/collections/${collectionId}`,
  );

  return data.collection;
};

export const createCollection = async (
  input: CreateCollectionInput,
): Promise<CollectionSummary> => {
  const { data } = await apiClient.post<CreateCollectionResponse>(
    "/collections",
    input,
  );

  return data.collection;
};

export const deleteCollection = async (collectionId: string): Promise<void> => {
  await apiClient.delete(`/collections/${collectionId}`);
};

export const addMovieToCollection = async ({
  collectionId,
  input,
}: {
  collectionId: string;
  input: AddMovieToCollectionInput;
}): Promise<CollectionMovie> => {
  const { data } = await apiClient.post<AddMovieToCollectionResponse>(
    `/collections/${collectionId}/movies`,
    input,
  );

  return data.collectionMovie;
};

export const removeMovieFromCollection = async ({
  collectionId,
  imdbId,
}: {
  collectionId: string;
  imdbId: string;
}): Promise<void> => {
  await apiClient.delete(`/collections/${collectionId}/movies/${imdbId}`);
};
