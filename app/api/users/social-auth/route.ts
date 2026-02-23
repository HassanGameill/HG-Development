import { ErrorHandler } from "@/lib/ErrorHandler";
import prisma from "@/lib/prismadb";
import { CorsHandler } from "@/utils/CorsHndler";
import { sendToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

// Interface for social auth request
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string
}

// Handle POST registration
export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const { email, name, avatar } = (await req.json()) as ISocialAuthBody;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatar: avatar
            ? {
                public_id: "social-avatar",
                url: avatar,
              }
            : undefined,
        
        },
      });
    }

    return sendToken(user, 200);
  } catch (error: any) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
