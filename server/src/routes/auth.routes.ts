import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.get("/me", requireAuth, me);