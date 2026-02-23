import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TCreateCategories } from "@/types/projects/projectCategoryType";
import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { CategorySchema } from "@/validation/Sections/Project/category";
import { NextRequest, NextResponse } from "next/server";

// CORS Handler
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers }); // 204 No Content is more appropriate for OPTIONS
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("ID are required", {
        status: 400,
      });
    }

    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const headers = CorsHandler(req);
    return NextResponse.json(category, { status: 200, headers });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * Handle PATCH Request to update product
 */

export async function PATCH(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();

  // Authentication check
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = (await req.json()) as TCreateCategories;

    // Validate input data using the schema
    const validation = CategorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 },
      );
    }

    // Update product
    const categories = await prisma.categories.update({
      where: {
        id: (await params).id,
      },
      data: {
        ...body,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(categories, { headers });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * Handle DELETE Request to remove product
 */

export async function DELETE(req: NextRequest, { params }: PageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Attempt to delete the product (no user restriction)
    const categories = await prisma.categories.delete({
      where: {
        id: (await params).id,
      },
    });

    const headers = CorsHandler(req);
    return NextResponse.json(categories, { status: 200, headers });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
