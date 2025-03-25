import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { JsPreferencesDTO } from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { auth } from "@/auth";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
  try {
    // Get essentials from session, not the request
    const session = await auth();
    const userId: string = session?.user.id!;

    const body: JsPreferencesDTO = await request.json();
    const { preferredEmploymentType } = body;

    if (!userId && !preferredEmploymentType) {
      return NextResponse.json(
        {
          error: "Invalid input. Requires userId and preferredEmploymentType",
        },
        { status: 400 },
      );
    }

    const upsertedPreferences = await prisma.jobseekers.update({
      where: { user_id: userId },
      data: {
        employment_type_sought: preferredEmploymentType,
        updatedAt: new Date(),
      },
      select: {
        user_id: true,
        employment_type_sought: true,
      },
    });
    const result: JsPreferencesDTO = {
      userId: upsertedPreferences.user_id,
      preferredEmploymentType: upsertedPreferences.employment_type_sought,
    };

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to update skills: ${error.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
