import { NextRequest, NextResponse } from "next/server";
import { CorsHandler } from "@/utils/CorsHndler";
import { redis } from "@/utils/redis";

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    // Get user ID from request (assuming you attach it via middleware)
    const userId = (req as any).user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401, headers }
      );
    }

    // Delete refresh token from Redis
    await redis.del(userId);

    // Clear cookies
    const res = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200, headers }
    );

    // Delete cookies by setting them to empty + maxAge 0
    res.cookies.set("access_token", "", {  maxAge: 0 });
    res.cookies.set("refresh_token", "", { maxAge: 0 });

    return res;
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
