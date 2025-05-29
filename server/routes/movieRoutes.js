import express from "express";
import { apiMovieCall } from "../controllers/movieController";
const router = express.Router();

router.get("/apiCall", apiMovieCall);

export default movieRouter;
