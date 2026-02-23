import { CorsHandler } from "@/lib/CorsHndler";
import prisma from "@/lib/prismadb";
import { generateSlug } from "@/utils/slugfy";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { heroSectionSchema, IHeroDto } from "@/validation/Sections/heroSection";

import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/lib/getCurrentUser";

// ✅ Handle CORS preflight requests
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

/**
 * POST - Create a new Export Service
 * @method POST
 * @route ~/api/export-services
 * @access private (requires logged-in user)
 */

export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401, headers });
  }

  try {
    const body = (await req.json()) as IHeroDto;
    // ✅ Validate input data
    const validation = heroSectionSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ message: validation.error.message }),
        { status: 400, headers },
      );
    }

    const slug = generateSlug(body.titleEn)
      ? generateSlug(body.titleEn)
      : generateSlug(body.titleAr, true);

    const lastHero = await prisma.hero.findFirst({
      orderBy: { position: "desc" },
    });
    const newPosition = lastHero ? Number(lastHero.position) + 1 : 1;

    // ✅ Create the Export Service with nested features
    const hero = await prisma.hero.create({
      data: {
        slug,
        ...body,
        position: newPosition,
        heroImages: {
          createMany: {
            data: body.heroImages.map((image) => ({ url: image.url })),
          },
        },
      },
      include: {
        heroImages: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(hero),
        message: "category is created",
      },
      { status: 201, headers: CorsHandler(req) },
    );
  } catch (error) {
    console.error("[EXPORT_SERVICES_POST_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

/**
 * GET - Fetch all Export Services
 * @method GET
 * @route ~/api/export-services
 * @access public
 */
export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);
  const currentUser = await getCurrentUser();
  const adminUser = currentUser?.role === "ADMIN";

  if (!adminUser) {
    return new NextResponse("Unauthorized", { status: 401, headers });
  }

  try {
    const hero = await prisma.hero.findMany({
      include: {
        heroImages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!hero.length) {
      return new NextResponse("No export services found", {
        status: 404,
        headers,
      });
    }

    return NextResponse.json(
      { success: true, data: JSON.stringify(hero), message: "get All Hero" },
      { status: 200, headers: CorsHandler(req) },
    );
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}
