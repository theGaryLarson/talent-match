import {NextResponse} from "next/server";
import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {
    PostCompanySocialLinkDTO,
    ReadCompanySocialLinkDTO
} from "@/data/dtos/EmployerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: {params: {socialId: string}}) {
    try {
        const socialId = params.socialId;

        if (!socialId) {
            return NextResponse.json({
                success: false,
                error: `A uuidv4 socialId is required.`
            }, {status: 400})
        }

        const deletedSocial = await prisma.company_social_links.delete({
            where: {
                social_media_id: socialId
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
                    }
                }
            }
        });

        const result: ReadCompanySocialLinkDTO = {
            companySocialId: deletedSocial.social_media_id,
            companyId: deletedSocial.company_id,
            employerId: deletedSocial.employer_id,
            socialPlatformId: deletedSocial.social_platform_id,
            socialUrl: deletedSocial.social_url,
            platform: deletedSocial.social_media_platforms.platform,
            platformIconUrl: deletedSocial.social_media_platforms.social_logo_url,
        }

        return NextResponse.json({success: true, result}, {status: 200})

    } catch (e: any) {
        console.error('Error removing company social media entry:', e.message);
        return NextResponse.json({error: `Failed to remove social media entry.\n${e.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}