import { prisma } from "../lib/prisma.js";
import type { CreateCollectionInput } from "../validators/collection.validator.js";

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
