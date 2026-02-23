import { authorizeRoles } from "@/lib/authorizeRoles";
import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TSkills } from "@/types/skillsType";
import { SkillsSchema } from "@/validation/Sections/skills";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST - Create a new skills
 * @method POST
 * @route ~/api/section/skills
 * @access private (requires logged-in user)
 */

export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN", "MANAGER"]);

  try {
    const body = (await req.json()) as TSkills;
    const validation = SkillsSchema.safeParse(body);
    if (!validation.success) {
      JSON.stringify({ message: validation.error.message });
    }


    // Order Last handler 
    const lastSkills = await prisma.skills.findFirst({
            orderBy: { position: "desc" },
          });
    const newPosition = lastSkills ? Number(lastSkills.position) + 1 : 1;



    const createSkills = await prisma.skills.create({
      data: {
        ...body,
        position: newPosition,
        skillsItem: {
          create: body.skillsItem.map((item) => ({
            name: item.name,
            title: item.title,
            level: item.level,
            imageUrl: item.imageUrl,
          })),
        },
      },
      include: {
        skillsItem: true,
      },
    });

    

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(createSkills),
        message: "skills created successfully",
      },
      { status: 201, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * GET - Get All skills
 * @method GET
 * @route ~/api/section/skills
 * @access private ()
 */

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);
  // const user = await getCurrentUser();
  // authorizeRoles(user?.role, ["ADMIN"]);

  try {
    const getAllSkills = await prisma.skills.findMany({
      include: {
        skillsItem: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!getAllSkills) {
      return new NextResponse("skills not found", { status: 404, headers });
    }

    return NextResponse.json(getAllSkills);
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
