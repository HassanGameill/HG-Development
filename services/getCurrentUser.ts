import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type JwtPayload = {
  id: string;
};

export async function getCurrentUser() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN!
    ) as JwtPayload;

    return await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        
      },
    });
  } catch (error) {
    return null;
  }
}
