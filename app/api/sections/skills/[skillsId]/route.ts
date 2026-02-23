import { authorizeRoles } from "@/lib/authorizeRoles";
import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TSkills } from "@/types/skillsType";
import { SkillsSchema } from "@/validation/Sections/skills";
import { NextRequest, NextResponse } from "next/server";

type TIdProps = {
  params: Promise<{ skillsId: string }>;
};

/**
 * UPDATE - UPDATE skills
 * @method UPDATE
 * @route ~/api/section/skills
 * @access private (requires logged-in user)
 */

export async function PATCH(req: NextRequest, { params }: TIdProps) {
  const headers = CorsHandler(req);
  const skillsId = (await params).skillsId;
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN"]);

  try {
    const body = (await req.json()) as TSkills;
    const validation = SkillsSchema.safeParse(body);
    if (!validation.success) {
      JSON.stringify({ message: validation.error.message });
    }

    const updateSkills = await prisma.skills.update({
      where: { id: skillsId },
      data: {
        ...body,
        skillsItem: {
          deleteMany: {},
          create: body.skillsItem.map((item) => ({
            name: item.name,
            title: item.title,
            level: item.level,
            imageUrl: item.imageUrl,
          })),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(updateSkills),
        message: "skills updated successfully",
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error("[Skills_UPDATED_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Get - Get Single Skills
 * @method GET
 * @route ~/api/section/skills
 * @access private (requires logged-in user)
 */

export async function GET(req: NextRequest, { params }: TIdProps) {
  const headers = CorsHandler(req);
  const skillsId = (await params).skillsId;
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN"]);

  try {
    const getSingleSkills = await prisma.skills.findUnique({
      where: { id: skillsId },
      include: {
        skillsItem: true,
      },
    });

    if (getSingleSkills) {
      return new NextResponse("single skills not found", { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(getSingleSkills),
        message: "get single skills successfully",
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error("[Skills_GET_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Delete - Delete Single Skills
 * @method DELETE
 * @route ~/api/section/skills
 * @access private (requires logged-in user)
 */

export async function DELETE(req: NextRequest, { params }: TIdProps) {
  const headers = CorsHandler(req);
  const skillsId = (await params).skillsId;
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN"]);

  try {
    const deleteSingleSkills = await prisma.skills.delete({
      where: { id: skillsId },
      include: {
        skillsItem: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(deleteSingleSkills),
        message: "skills deleted successfully",
      },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error("[Skills_DELETE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
