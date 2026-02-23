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
 * UPDATE - UPDATE a  project
 * @method UPDATE
 * @route ~/api/section/projects
 * @access private (requires logged-in user)
 */

interface IdProps {
  params: Promise<{ projectId: string }>;
}

export async function PATCH(req: NextRequest, { params }: IdProps) {
  // Cors Handler
  const headers = CorsHandler(req);
  const projectId = (await params).projectId;

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

    // __ Create Project _____
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...body,
        // update Project Images
        images: {
          deleteMany: {},
          createMany: {
            data: body.images.map((image) => ({ url: image.url })),
          },
        },
        // Create Project Technology
        projectTechnology: {
          deleteMany: {},
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
        message: "project updated successfully",
      },
      { status: 200, headers },
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

export async function GET(req: NextRequest, { params }: IdProps) {
  const headers = CorsHandler(req);
  const projectId = (await params).projectId;

  try {
    const projects = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        projectTechnology: true,
        images: true,
      },
    });

    if (!projects) {
      return new NextResponse("No projects found", { status: 404, headers });
    }

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(projects),
        message: "Get Single Project Successfully",
      },
      { status: 200, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: IdProps) {
  const headers = CorsHandler(req);

  const projectId = (await params).projectId;

  // __ Get Current User ____
  const currentUser = await getCurrentUser();
  const Admin = currentUser?.role === "ADMIN";
  if (!Admin) {
    return new NextResponse("Unauthorized", { status: 401, headers });
  }

  try {
    const deleteProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      {
        success: true,
        data: JSON.stringify(deleteProject),
        message: "Project Deleted Successfully",
      },
      { status: 200, headers },
    );
  } catch (error) {
    console.error("[PRODUCTS_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
