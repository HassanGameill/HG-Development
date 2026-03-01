import { authorizeRoles } from "@/lib/authorizeRoles";
import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TExperience } from "@/types/experienceType";
import { ExperienceSchema } from "@/validation/Sections/experience";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST - Create a new Experience
 * @method POST
 * @route ~/api/section/Experience
 * @access private (requires logged-in user)
 */

export async function POST(req: NextRequest) {
  const headers = CorsHandler(req);
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN"]);

  try {
    const body = (await req.json()) as TExperience;
    const validation = ExperienceSchema.safeParse(body);

    if (!validation.success) {
      JSON.stringify({ message: validation.error.message });
    }

    //______ Order List Experience ________
    const lastExperience = await prisma.experience.findFirst({
      orderBy: { position: "desc" },
    });
    const newPosition = lastExperience
      ? Number(lastExperience.position) + 1
      : 1;

    //______ Order List ExperienceAchievement ________
    const lastExperienceAchievement =
      await prisma.experienceAchievement.findFirst({
        orderBy: { position: "desc" },
      });
    const newPositionExperienceAchievement = lastExperienceAchievement
      ? Number(lastExperienceAchievement.position) + 1
      : 1;

    const createExperience = await prisma.experience.create({
      data: {
        ...body,
        position: newPosition,

        experienceAchievement: {
          create: body.experienceAchievement.map((item) => ({
            title: item.title,
            subtitle: item.subtitle,
            position: newPositionExperienceAchievement,
          })),
        },
        
      },
      include: {
        experienceAchievement: true
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully",
        data: JSON.stringify(createExperience),
      },
      {
        status: 201,
        headers,
      },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * GET - GET All Experience
 * @method GET
 * @route ~/api/section/Experience
 * @access public (requires logged-in user)
 */

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const getAllExperience = await prisma.experience.findMany({
      include: {
        experienceAchievement: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

     return NextResponse.json(
      getAllExperience,
      { status: 200, headers },
    );

    
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
