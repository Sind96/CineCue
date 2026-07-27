import { apiClient } from "../../../lib/apiClient";
import type {
  LoginInput,
  RegisterInput,
  User,
  UserResponse,
} from "../types/auth.types";

export const loginUser = async (input: LoginInput): Promise<User> => {
  const response = await apiClient.post<UserResponse>("/auth/login", input);

  return response.data.user;
};

export const registerUser = async (input: RegisterInput): Promise<User> => {
  const response = await apiClient.post<UserResponse>("/auth/register", input);

  return response.data.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<UserResponse>("/auth/me");

  return response.data.user;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

export const refreshSession = async (): Promise<void> => {
  await apiClient.post("/auth/refresh");
};
