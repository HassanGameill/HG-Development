import prisma from "@/lib/prismadb";
import { createActivationToken } from "@/services/createActivationToken";
import { CorsHandler } from "@/utils/CorsHndler";
import sendMail from "@/utils/sendMail";
import { RegisterSchema, TRegister } from "@/validation/auth/SignUpSchema";
import { NextRequest, NextResponse } from "next/server";

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

// Handle POST registration
export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const body = (await req.json()) as TRegister;
    const { name, email, password, phone } = body; // ✅ added phone

    // Check required fields
    if (!name || !email || !password || !phone) {
      return new NextResponse(
        JSON.stringify({
          message: "Name, email, password, and phone are required",
        }),
        { status: 400, headers },
      );
    }

    // Validate input
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({
          message: validation.error.issues.map((i) => i.message).join(", "),
        }),
        { status: 400, headers },
      );
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Email already exists" }),
        { status: 400, headers },
      );
    }

    // Hash password
    // const hashPassword = await bcrypt.hash(password, 10);

    const user = { name, email, password, phone };

    // Create activation token
    const activationToken = createActivationToken({
      name,
      email,
      password,
      phone,
    });
    const activationCode = activationToken.activationCode;

    const templateData = { name: user.name, activationCode };

    try {
      // ---- Send Email ----
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        template: "activation-mail.ejs",
        data: templateData,
      });

      // ---- Send SMS ----
      // await sendSms({
      //   to: user.phone,
      //   message: `Hello ${user.name}, your activation code is: ${activationCode}`,
      // });

      return NextResponse.json(
        {
          user,
          activationToken: activationToken.token,
          message: "Successfully registered",
        },
        { status: 201, headers },
      );
    } catch (error) {
      console.error("Error sending notification:", error);

      
    }
  } catch (error: any) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
