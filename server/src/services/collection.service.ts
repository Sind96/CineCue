import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import type {
  AddMovieToCollectionInput,
  CreateCollectionInput,
  UpdateCollectionInput,
} from "../validators/collection.validator.js";

export const createCollection = async (
  ownerId: string,
  input: CreateCollectionInput,
) => {
  return prisma.collection.create({
    data: {
      ownerId,
      name: input.name,
      description: input.description,
    },
  });
};

export const getCollections = async (ownerId: string) => {
  return prisma.collection.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const addMovieToCollection = async (
  userId: string,
  collectionId: string,
  input: AddMovieToCollectionInput,
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      ownerId: userId,
    },
  });

  if (!collection) {
    throw new AppError(404, "Collection not found");
  }

  const movie = await prisma.movie.upsert({
    where: {
      imdbId: input.imdbId,
    },
    update: {},
    create: {
      imdbId: input.imdbId,
      title: input.title,
      year: input.year,
      posterUrl: input.posterUrl,
      overview: input.overview,
      runtimeMinutes: input.runtimeMinutes,
      genres: input.genres,
      externalSource: input.externalSource,
    },
  });

  const existingCollectionMovie = await prisma.collectionMovie.findUnique({
    where: {
      collectionId_movieId: {
        collectionId,
        movieId: movie.id,
      },
    },
  });

  if (existingCollectionMovie) {
    throw new AppError(409, "Movie already exists in this collection");
  }

  return prisma.collectionMovie.create({
    data: {
      collectionId,
      movieId: movie.id,
      addedById: userId,
    },
    include: {
      movie: true,
    },
  });
};

export const getCollection = async (userId: string, collectionId: string) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      ownerId: userId,
    },
    include: {
      movies: {
        include: {
          movie: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!collection) {
    throw new AppError(404, "Collection not found");
  }

  return collection;
};

export const removeMovieFromCollection = async (
  userId: string,
  collectionId: string,
  imdbId: string,
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      ownerId: userId,
    },
  });

  if (!collection) {
    throw new AppError(404, "Collection not found");
  }

  const movie = await prisma.movie.findUnique({
    where: {
      imdbId,
    },
  });

  if (!movie) {
    throw new AppError(404, "Movie not found");
  }

  const collectionMovie = await prisma.collectionMovie.findUnique({
    where: {
      collectionId_movieId: {
        collectionId,
        movieId: movie.id,
      },
    },
  });

  if (!collectionMovie) {
    throw new AppError(404, "Movie not found in this collection");
  }

  return prisma.collectionMovie.delete({
    where: {
      collectionId_movieId: {
        collectionId,
        movieId: movie.id,
      },
    },
  });
};

export const deleteCollection = async (
  userId: string,
  collectionId: string,
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      ownerId: userId,
    },
  });

  if (!collection) {
    throw new AppError(404, "Collection not found");
  }

  return prisma.collection.delete({
    where: {
      id: collectionId,
    },
  });
};

export const updateCollection = async (
  userId: string,
  collectionId: string,
  input: UpdateCollectionInput,
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      ownerId: userId,
    },
  });

  if (!collection) {
    throw new AppError(404, "Collection not found");
  }

  return prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: input,
  });
};
