import { NextResponse } from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { PrismaClient } from "@prisma/client";
import { ReadCompanySocialLinkDTO } from "@/data/dtos/EmployerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function GET(
  request: Request,
  props: { params: Promise<{ companyId: string }> },
) {
  const params = await props.params;
  try {
    const companyId = params.companyId;

    if (!companyId) {
      return NextResponse.json(
        {
          success: false,
          error: `A uuidv4 companyId is required.`,
        },
        { status: 400 },
      );
    }

    const companySocialPlatforms = await prisma.company_social_links.findMany({
      where: {
        company_id: companyId,
      },
      select: {
        social_media_id: true,
        social_platform_id: true,
        company_id: true,
        employer_id: true,
        social_url: true,
        social_media_platforms: {
          select: {
            platform: true,
            social_logo_url: true,
          },
        },
      },
    });

    const result: ReadCompanySocialLinkDTO[] = companySocialPlatforms.map(
      (sm) => ({
        companySocialId: sm.social_media_id,
        companyId: sm.company_id,
        employerId: sm.employer_id,
        socialPlatformId: sm.social_platform_id,
        socialUrl: sm.social_url,
        platform: sm.social_media_platforms.platform,
        platformIconUrl: sm.social_media_platforms.social_logo_url,
      }),
    );

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e: any) {
    console.error("Error getting company social media entries:", e.message);
    return NextResponse.json(
      { error: `Failed to get company social media entries.\n${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
