import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import favouriteRouter from "./routes/favouriteRoutes.js";
import streamingAvailabilityRouter from "./routes/streamingAvailabilityRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/favourites", favouriteRouter);
app.use(streamingAvailabilityRouter);

(async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT);
    console.log(
      `Server running on PORT ${PORT} and Database has successfully connected!🕊️`
    );
  } catch (error) {
    console.log(`Database could not connect:`, error);
  }
})();
