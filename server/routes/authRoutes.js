import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", protect, checkUser);

export default router;
