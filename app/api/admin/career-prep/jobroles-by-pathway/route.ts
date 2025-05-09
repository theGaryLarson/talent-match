import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { Role } from "@/data/dtos/UserInfoDTO";

const prisma = new PrismaClient();

export type RoleInfo = {
  role_id: string;
  title: string;
};

export type PathwayStructure = {
  pathway_id: string;
  pathway_title: string;
  roles: RoleInfo[];
};

export async function GET() {
  const session = await auth();
  if (
    !session?.user.roles.includes(Role.CASE_MANAGER) &&
    !session?.user.roles.includes(Role.ADMIN)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pathwaysWithRoles = await prisma.pathways.findMany({
      orderBy: {
        pathway_title: "asc",
      },
      select: {
        pathway_id: true,
        pathway_title: true,
        jobRoles: {
          orderBy: {
            title: "asc",
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!pathwaysWithRoles || pathwaysWithRoles.length === 0) {
      return NextResponse.json(
        { message: "No pathways or roles found." },
        { status: 200 },
      );
    }

    const result: PathwayStructure[] = pathwaysWithRoles.map((pathway) => ({
      pathway_id: pathway.pathway_id,
      pathway_title: pathway.pathway_title,
      roles: pathway.jobRoles.map((role) => ({
        role_id: role.id,
        title: role.title,
      })),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching job roles by pathway:", error);
    return NextResponse.json(
      { error: "Failed to fetch job roles by pathway" },
      { status: 500 },
    );
  }
}
