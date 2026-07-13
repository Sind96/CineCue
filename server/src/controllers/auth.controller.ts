import type { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import {
  ACCESS_COOKIE_MAX_AGE,
  baseCookieOptions,
  REFRESH_COOKIE_MAX_AGE,
} from "../config/cookies.js";
import { AppError } from "../utils/AppError.js";
import { signAccessToken, verifyRefreshToken } from "../utils/token.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      ...baseCookieOptions,
      maxAge: ACCESS_COOKIE_MAX_AGE,
    });

    res.cookie("refreshToken", refreshToken, {
      ...baseCookieOptions,
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("accessToken", baseCookieOptions);

  res.clearCookie("refreshToken", baseCookieOptions);

  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const me = (req: Request, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
};

export const refresh = (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(401, "Authentication required");
    }

    const payload = verifyRefreshToken(refreshToken);

    if (payload.type !== "refresh") {
      throw new AppError(401, "Invalid refresh token");
    }

    const accessToken = signAccessToken({
      userId: payload.userId,
      type: "access",
    });

    res.cookie("accessToken", accessToken, {
      ...baseCookieOptions,
      maxAge: ACCESS_COOKIE_MAX_AGE,
    });

    res.status(200).json({
      message: "Access token refreshed",
    });
  } catch (error) {
    next(error);
  }
};
