import { publicUserSelect } from "../lib/prisma-selects.js";
import { prisma } from "../lib/prisma.js";
import type { AuthUser } from "../types/auth.types.js";
import { AppError } from "../utils/AppError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/token.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";

type LoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
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
    select: publicUserSelect,
  });
  return user;
};

export const loginUser = async (input: LoginInput): Promise<LoginResponse> => {
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

  const accessToken = signAccessToken({
    userId: user.id,
    type: "access",
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
    type: "refresh",
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};
