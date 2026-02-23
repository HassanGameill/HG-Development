export const ACCESS_TOKEN_EXPIRE = Number(
  process.env.ACCESS_TOKEN_EXPIRE || 15 // minutes
);

export const REFRESH_TOKEN_EXPIRE = Number(
  process.env.REFRESH_TOKEN_EXPIRE || 7 // days
);

export const accessTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: ACCESS_TOKEN_EXPIRE * 60,
  path: "/",
};

export const refreshTokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: REFRESH_TOKEN_EXPIRE * 24 * 60 * 60,
  path: "/",
};
