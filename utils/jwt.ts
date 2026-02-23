import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { redis } from "./redis";

export interface IUser {
  id: string; // required now
  email: string;
  role?: string;
}

export const sendToken = async (user: IUser, statusCode = 200) => {
  const accessSecret = process.env.ACCESS_TOKEN;
  const refreshSecret = process.env.REFRESH_TOKEN;

  if (!accessSecret || !refreshSecret) {
    throw new Error("ACCESS_TOKEN or REFRESH_TOKEN env variable is missing!");
  }

  const accessTokenExpireHours = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", 10);
  const refreshTokenExpireDays = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "3", 10);

  if (!user.id) throw new Error("User ID is missing");

  // Generate JWTs
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role || "user" },
    accessSecret,
    { expiresIn: accessTokenExpireHours * 60 * 60 }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    refreshSecret,
    { expiresIn: refreshTokenExpireDays * 24 * 60 * 60 }
  );

  // Store minimal session info in Redis
  try {
    await redis.set(user.id, JSON.stringify({ id: user.id, email: user.email, role: user.role }));
  } catch (err) {
    console.error("[Redis] Failed to store session:", err);
  }

  // Create response
  const response = NextResponse.json({ success: true, user, accessToken }, { status: statusCode });

  // Set cookies
  response.cookies.set("access_token", accessToken, {
    path: "/",
    expires: new Date(Date.now() + accessTokenExpireHours * 60 * 60 * 1000),
    maxAge: accessTokenExpireHours * 60 * 60,
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  response.cookies.set("refresh_token", refreshToken, {
    path: "/",
    expires: new Date(Date.now() + refreshTokenExpireDays * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpireDays * 24 * 60 * 60,
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
};
