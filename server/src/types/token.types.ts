export type AccessTokenPayload = {
  userId: string;
  type: "access";
};

export type RefreshTokenPayload = {
  userId: string;
  type: "refresh";
};
