import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TCreateCategories } from "@/types/projects/projectCategoryType";
import { CorsHandler } from "@/utils/CorsHndler";
import { CategorySchema } from "@/validation/Sections/Project/category";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

/**
 * @method  POST
 * @route   ~/api/stores
 * @desc    Create a new package
 * @access  Private (Only admin can create package)
 */

export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: CorsHandler(req),
      });
    }

    const body = (await req.json()) as TCreateCategories;
    const validation = CategorySchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ message: validation.error.message }),
        { status: 400, headers },
      );
    }

    const lastCategories = await prisma.categories.findFirst({
            orderBy: { position: "desc" },
          });
    const newPosition = lastCategories ? Number(lastCategories.position) + 1 : 1;

    

    const category = await prisma.categories.create({
      data: {
        ...body,
        position: newPosition
      },
    });

    return NextResponse.json(
      { success: true, data: category, message: "category is created" },
      { status: 201, headers: CorsHandler(req) },
    );

    // return NextResponse.json(category, {
    //   status: 201,
    //   headers: CorsHandler(req),
    // });

  } catch (error) {
    console.error("[Categories_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}

/**
 * @method  GET
 * @route   ~/api
 * @desc    Get Categories for a store
 * @access  Private
 */
export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const courseCategory = await prisma.categories.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      courseCategory.length === 0 ? [] : courseCategory,
      {
        status: 200,
        headers: CorsHandler(req),
      },
    );
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500, headers });
  }
}
