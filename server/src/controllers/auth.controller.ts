import type { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

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
    const { user, accessToken } = await loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
};
