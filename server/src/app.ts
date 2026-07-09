import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { healthRouter } from "./routes/health.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { movieRouter } from "./routes/movie.routes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { favouriteRouter } from "./routes/favourite.routes.js";
import { collectionRouter } from "./routes/collection.routes.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/favourites", favouriteRouter);
app.use("/api/collections", collectionRouter);

app.use(notFoundHandler);
app.use(errorHandler);
