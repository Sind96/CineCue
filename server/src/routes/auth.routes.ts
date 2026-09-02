import { Router } from "express";
import {
  login,
  logout,
  me,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

export const authRouter = Router();

authRouter.post("/register", authLimiter, validateRegister, register);
authRouter.post("/login", authLimiter, validateLogin, login);
authRouter.get("/me", requireAuth, me);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);
