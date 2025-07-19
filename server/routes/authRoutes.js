import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkUser,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", checkUser);

export default router;
