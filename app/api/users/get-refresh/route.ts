import prisma from "@/lib/prismadb";
import { CorsHandler } from "@/utils/CorsHndler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/utils/redis"; // Make sure you have a redis client
import bcrypt from "bcryptjs";

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

// GET refresh token
export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const refresh_token = req.cookies.get("refresh_token")?.value;

    if (!refresh_token) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401, headers }
      );
    }

    // Verify refresh token
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN!) as JwtPayload;

    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 400, headers }
      );
    }

    // Get session from Redis
    const session = await redis.get(decoded.id);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Please login to access this resource" },
        { status: 401, headers }
      );
    }

    const user = JSON.parse(session);

    // Generate new tokens
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN!, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN!, { expiresIn: "3d" });

    // Update session in Redis for 7 days
    await redis.set(user.id, JSON.stringify(user), "EX", 7 * 24 * 60 * 60);

    // Prepare response and set cookies
    const response = NextResponse.json({ success: true, accessToken }, { status: 200, headers });
    response.cookies.set("access_token", accessToken, { httpOnly: true, sameSite: "strict", maxAge: 5 * 60 });
    response.cookies.set("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 3 * 24 * 60 * 60 });

    return response;
  } catch (error) {
    console.error("TOKEN REFRESH ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
