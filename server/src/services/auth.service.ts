import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export const registerUser = async (input: RegisterInput): Promise<AuthUser> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existingUser) {
    throw new AppError(409, "Email is already registered");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return user;
};

export const loginUser = async (input: LoginInput): Promise<AuthUser> => {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const passwordMatches = await comparePassword(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError(401, "Invalid email or password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
