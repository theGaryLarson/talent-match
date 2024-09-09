import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {JsPreferencesDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsPreferencesDTO = await request.json();
        const {
            userId,
            preferredEmploymentType,
            targetedPathwayId,
            targetedPathway
        } = body;

        if (!userId && (!preferredEmploymentType || !targetedPathway)) {
            return NextResponse.json({error: 'Invalid input. Requires userId and preferredEmploymentType and/or targetedPathway'}, {status: 400});
        }
        let pw = null;
        if (!targetedPathwayId && targetedPathway) {
            pw = await prisma.pathways.findUnique({
                where: {
                    pathway_title: targetedPathway,
                }
            })

            if (!pw) {
                return NextResponse.json({error: `No record exists for pathway : ${targetedPathway}.`}, {status: 404});
            }
        }

        const upsertedPreferences = await prisma.jobseekers.update({
            where: {user_id: userId},
            data: {
                employment_type_sought: preferredEmploymentType,
                targeted_pathway: targetedPathwayId || pw?.pathway_id,
                updatedAt: new Date(),
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
        const result: JsPreferencesDTO = {
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
