import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/token.js";

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new AppError(401, "Authentication required");
    }

    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new AppError(401, "Authentication required");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
