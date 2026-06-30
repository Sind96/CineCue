import { prisma } from "../lib/prisma.js";

type HealthResponse = {
  status: "ok";
  database: "connected";
};

export const checkHealth = async (): Promise<HealthResponse> => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
};
