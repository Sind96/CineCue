import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/watchlist", protect, (req, res) => {
  res.json({ message: "Here is your watchlist!", user: req.user });
});

export default router;
