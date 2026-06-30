import express from "express";
import { prisma } from "./lib/prisma.js";

export const app = express();

app.use(express.json());

app.get("/health", async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
});
