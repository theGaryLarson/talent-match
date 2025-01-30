import { NextResponse } from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import { PrismaClient } from "@prisma/client";
import {
  PostCompanySocialLinkDTO,
  ReadCompanySocialLinkDTO,
} from "@/data/dtos/EmployerProfileCreationDTOs";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
  try {
    // Get essentials from session, not the request
    const session = await auth();
    const companyId: string | null | undefined = session?.user.companyId;

    const body: PostCompanySocialLinkDTO = await request.json();
    const { socialPlatformId, employerId, socialUrl } = body;

    if (!companyId || !socialPlatformId || !employerId || !socialUrl) {
      return NextResponse.json(
        {
          success: false,
          error: `A uuidv4 companyId, socialPlatformId, employerId, and socialUrl is required.`,
        },
        { status: 400 },
      );
    }
    if (!session?.user.employeeIsApproved) {
      return NextResponse.json(
        {
          success: false,
          error: `Employee needs to be approved to edit this company.`,
        },
        { status: 401 },
      );
    }

    const companySocialAccount = await prisma.company_social_links.create({
      data: {
        social_media_id: uuidv4(),
        social_platform_id: socialPlatformId,
        company_id: companyId,
        employer_id: employerId,
        social_url: socialUrl,
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

    const result: ReadCompanySocialLinkDTO = {
      companySocialId: companySocialAccount.social_media_id,
      companyId: companySocialAccount.company_id,
      employerId: companySocialAccount.employer_id,
      socialPlatformId: companySocialAccount.social_platform_id,
      socialUrl: companySocialAccount.social_url,
      platform: companySocialAccount.social_media_platforms.platform,
      platformIconUrl:
        companySocialAccount.social_media_platforms.social_logo_url,
    };

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (e: any) {
    console.error("Error creating company social media entry:", e.message);
    return NextResponse.json(
      { error: `Failed to create company social media entry.\n${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
