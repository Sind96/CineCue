import dotenv from "dotenv";
import { type SignOptions } from "jsonwebtoken";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  DATABASE_URL:
    process.env.DATABASE_URL ??
    (() => {
      throw new Error("DATABASE_URL is missing");
    })(),

  PORT: Number(process.env.PORT ?? 3000),

  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET ??
    (() => {
      throw new Error("JWT_ACCESS_SECRET is missing");
    })(),

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ??
    (() => {
      throw new Error("JWT_REFRESH_SECRET is missing");
    })(),

  JWT_ACCESS_EXPIRES_IN:
    (process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]) ?? "15m",

  JWT_REFRESH_EXPIRES_IN:
    (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d",

  MOVIE_API_BASE_URL:
    process.env.MOVIE_API_BASE_URL ??
    (() => {
      throw new Error("MOVIE_API_BASE_URL is missing");
    })(),

  MOVIE_API_KEY:
    process.env.MOVIE_API_KEY ??
    (() => {
      throw new Error("MOVIE_API_KEY is missing");
    })(),

  MOVIE_API_HOST:
    process.env.MOVIE_API_HOST ??
    (() => {
      throw new Error("MOVIE_API_HOST is missing");
    })(),
};
