import { authorizeRoles } from "@/lib/authorizeRoles";
import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TExperience } from "@/types/experienceType";
import { ExperienceSchema } from "@/validation/Sections/experience";
import { NextRequest, NextResponse } from "next/server";

type TIdProps = {
  params: Promise<{ id: string }>;
};

/**
 * UPDATE - UPDATE Experience
 * @method UPDATE
 * @route ~/api/section/Experience
 * @access private (requires logged-in user)
 */

export async function PATCH(req: NextRequest, { params }: TIdProps) {
  const headers = CorsHandler(req);
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN"]);
  const id = (await params).id;

  try {
    const body = (await req.json()) as TExperience;
    const validation = ExperienceSchema.safeParse(body);
    if (!validation.success) {
      JSON.stringify({ message: validation.error.message });
    }

    const updateExperience = await prisma.experience.update({
      where: {
        id,
      },
      data: {
        ...body,

        experienceAchievement: {
          deleteMany: {},
          create: body.experienceAchievement.map((item) => ({
            title: item.title,
            subtitle: item.subtitle,
          })),
        },
      },
      include: {
        experienceAchievement: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Experience Updated successfully",
        data: updateExperience,
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * GET - GET Single Experience
 * @method GET
 * @route ~/api/section/Experience
 * @access private (requires logged-in user)
 */

export async function GET(req: NextRequest, { params }: TIdProps) {
  const headers = CorsHandler(req);
  const id = (await params).id;

  try {
    const getSingleExperience = await prisma.experience.findUnique({
      where: { id },
      include: {
        experienceAchievement: true,
      },
    });

    if (!getSingleExperience) {
      return new NextResponse("single SingleExperience not found", {
        status: 404,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "get SingleExperience successfully",
        data: getSingleExperience,
      },
      { status: 200, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Delete - Delete Single Experience
 * @method DELETE
 * @route ~/api/section/Experience
 * @access private (requires logged-in user)
 */

export async function DELETE(req: NextRequest, { params }: TIdProps) {
  const headers = CorsHandler(req);
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN"]);
  const id = (await params).id;

  try {
    const deleteExperience = await prisma.experience.delete({
      where: { id },
      include: {
        experienceAchievement: true,
      },
    });

    if (!deleteExperience) {
      return new NextResponse("delete Experience not found", { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Experience deleted Successfully",
        data: deleteExperience,
      },
      { status: 200, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
