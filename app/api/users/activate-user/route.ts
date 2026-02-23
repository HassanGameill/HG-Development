import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import {redis}  from "@/utils/redis";

// GET refresh token
export async function GET(req: NextRequest) {
  try {
    // Get refresh token from cookies
    const refresh_token = req.cookies.get("refresh_token")?.value;

    if (!refresh_token) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401 }
      );
    }

    // Verify token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN!) as JwtPayload;
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Get user session from Redis
    const session = await redis.get(decoded.id);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Please login to access this resource" },
        { status: 401 }
      );
    }

    const user = JSON.parse(session);

    // Generate new tokens
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN!, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN!, { expiresIn: "3d" });

    // Update session in Redis for 7 days
    await redis.set(user.id, JSON.stringify(user), "EX", 7 * 24 * 60 * 60);

    // Prepare NextResponse and set cookies
    const response = NextResponse.json({ success: true, accessToken }, { status: 200 });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 5 * 60, // 5 minutes
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 24 * 60 * 60, // 3 days
    });

    return response;
  } catch (error) {
    console.error("TOKEN REFRESH ERROR:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
