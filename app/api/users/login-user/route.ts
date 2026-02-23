import prisma from "@/lib/prismadb";
import { CorsHandler } from "@/utils/CorsHndler";
import { sendToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

interface ILoginRequest {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const body = await req.json() as ILoginRequest;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please enter email and password" },
        { status: 400, headers }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400, headers }
      );
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400, headers }
      );
    }

    // Generate token and set cookies
    return await sendToken(user); // sendToken returns NextResponse directly

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500, headers }
    );
  }
}
