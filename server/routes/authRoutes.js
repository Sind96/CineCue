import express from "express";
import { router } from "./authRoutes.js";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
