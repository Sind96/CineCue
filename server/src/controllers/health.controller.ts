import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getHealth = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
};
