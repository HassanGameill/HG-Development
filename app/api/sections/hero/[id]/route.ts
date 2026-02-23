import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { generateSlug } from "@/utils/slugfy";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { heroSectionSchema, IHeroDto } from "@/validation/Sections/heroSection";

import { NextRequest, NextResponse } from "next/server";

// ✅ Handle OPTIONS (CORS)
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

type PageProps = {
  params: Promise<{ id: string; slug?: string }>;
};

/**
 * ✅ GET - Fetch a single export service by ID and slug
 */
export async function GET(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();
    const adminUser = currentUser?.role === "ADMIN";
  
    if (!adminUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Export Service ID and slug are required", {
        status: 400,
      });
    }

    const hero = await prismadb.hero.findUnique({
      where: { id: id },
      include: { heroImages: true },
    });

    if (!hero) {
      return new NextResponse("Export service not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(hero, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}

/**
 * ✅ PATCH - Update an export service
 */
export async function PATCH(req: NextRequest, { params }: PageProps) {
 const currentUser = await getCurrentUser();
   const adminUser = currentUser?.role === "ADMIN";
 
   if (!adminUser) {
     return new NextResponse("Unauthorized", { status: 401 });
   }
  try {
    const { id, slug } = await params;
    const body = (await req.json()) as IHeroDto;

    // ✅ Validate data
    const validation = heroSectionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 },
      );
    }

    const newSlug =
      generateSlug(body.titleEn) || generateSlug(body.titleAr, true);

    // ✅ Update main service
    const updatedHero = await prismadb.hero.update({
      where: { id: id, slug },
      data: {
        ...body,
        slug: newSlug,
        // ✅ Replace features (delete old and recreate)
        heroImages: {
          deleteMany: {}, // removes all previous features
          createMany: {
            data: body.heroImages.map((image) => ({ url: image.url })),
          },
        },
      },
      include: { heroImages: true },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(updatedHero, { status: 200, headers });
  } catch (error) {
    axiosErrorHandler(error);
  }
}

/**
 * ✅ DELETE - Remove an export service
 */

export async function DELETE(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { id } = await params;

    if (!id) {
      return new NextResponse("Hero ID is required", { status: 400 });
    }

    const deletedHero = await prismadb.hero.delete({
      where: { id },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(deletedHero, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
