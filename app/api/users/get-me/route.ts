// app/api/user/me/route.ts
import { getCurrentUser } from "@/services/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

    console.log("MAnin", user)


  return NextResponse.json(user);
}
