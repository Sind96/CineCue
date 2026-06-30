import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { healthRouter } from "./routes/health.routes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

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

app.use(notFoundHandler);
app.use(errorHandler);
