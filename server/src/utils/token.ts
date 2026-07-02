import jwt, { type SignOptions } from "jsonwebtoken";

type AccessTokenPayload = {
  userId: string;
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}

const JWT_ACCESS_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"]) || "15m";

export const signAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
};
