import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/token.js";
import { publicUserSelect } from "../lib/prisma-selects.js";
import jwt from "jsonwebtoken";

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

    let payload;

    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError ||
        error instanceof jwt.JsonWebTokenError
      ) {
        throw new AppError(401, "Authentication required");
      }

      throw error;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: publicUserSelect,
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
