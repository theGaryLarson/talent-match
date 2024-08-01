import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {JsPreferencesDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsPreferencesDTO = await request.json();
        const {userId, preferredEmploymentType, targetedPathwayId } = body;

        if (!userId && (!preferredEmploymentType || !targetedPathwayId)) {
            return NextResponse.json({error: 'Invalid input. Requires userId and preferredEmploymentType and/or targetedPathwayId'}, {status: 400});
        }

            const upsertedPreferences = await prisma.jobseekers.update({

                where: {user_id: userId},
                data: {
                    user_id: userId,
                    employment_type_sought: preferredEmploymentType,
                    targeted_pathway: targetedPathwayId
                },
                select: {
                    user_id: true,
                    targeted_pathway: true,
                    employment_type_sought: true,
                    pathways: {
                        select: {
                            pathway_title: true
                        }
                    }
                }

            });
        const result: JsPreferencesDTO & {targetedPathway?: string | null} ={
            userId: upsertedPreferences.user_id,
            targetedPathwayId: upsertedPreferences.targeted_pathway,
            targetedPathway: upsertedPreferences.pathways?.pathway_title,
            preferredEmploymentType: upsertedPreferences.employment_type_sought
        };


        return NextResponse.json({success: true, result}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: `Failed to update skills: ${error.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
