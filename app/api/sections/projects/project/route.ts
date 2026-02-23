import { authorizeRoles } from "@/lib/authorizeRoles";
import { CorsHandler } from "@/lib/CorsHndler";
import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import { TProject } from "@/types/projects/projectType";
import { ProjectSchema } from "@/validation/Sections/Project/projects";
import { NextRequest, NextResponse } from "next/server";

//____ CORS Handler  _______
export async function OPTIONS(req: NextRequest) {
  const headers = CorsHandler(req);
  return new NextResponse(null, { status: 204, headers });
}

/**
 * POST - Create a new project
 * @method POST
 * @route ~/api/section/projects
 * @access private (requires logged-in user)
 */

export async function POST(req: NextRequest) {
  // Cors Handler
  const headers = CorsHandler(req);

  // __ Get Current User ____
  const user = await getCurrentUser();
  authorizeRoles(user?.role, ["ADMIN", "MANAGER"]);
  

  try {
    const body = (await req.json()) as TProject;

    // ___ Validate inputs data _______
    const validation = ProjectSchema.safeParse(body);
    if (!validation.success) {
      JSON.stringify({ message: validation.error.message });
    }


    // Order Last handler 
    const lastProject = await prisma.project.findFirst({
            orderBy: { position: "desc" },
          });
    const newPosition = lastProject ? Number(lastProject.position) + 1 : 1;


    // __ Create Project _____
    const project = await prisma.project.create({
      data: {
        ...body,
        position: newPosition,
        // Create Project Images
        images: {
          createMany: {
            data: body.images.map((image) => ({ url: image.url })),
          },
        },

        // Create Project Technology
        projectTechnology: {
          create: body.projectTechnology.map((item) => ({
            name: item.name,
            imageUrl: item.imageUrl,
          })),
        },
      },
      include: {
        projectTechnology: true,
        images: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(project),
        message: "project created successfully",
      },
      { status: 201, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * POST - get all projects
 * @method GET
 * @route ~/api/section/projects
 * @access private (requires logged-in user)
 */

export async function GET(req: NextRequest) {
  const headers = CorsHandler(req);

  try {
    const projects = await prisma.project.findMany({
      include: {
        projectTechnology: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!projects) {
      return new NextResponse("No projects found", { status: 404, headers });
    }

    return NextResponse.json(
      projects,
      { status: 200, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
