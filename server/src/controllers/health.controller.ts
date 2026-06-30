import type { NextFunction, Request, Response } from "express";
import { checkHealth } from "../services/health.service.js";

export const getHealth = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const health = await checkHealth();
    res.json(health);
  } catch (error) {
    next(error);
  }
};
