import getPrismaClient from "@/app/lib/prismaClient.mjs";
import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
import {JsPreferencesDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    try {
        const body: JsPreferencesDTO = await request.json();
        const {jobseekerId} = body;

        if (!jobseekerId) {
            return NextResponse.json({error: 'Invalid input. Requires jobseekerId.'}, {status: 400});
        }

        const preferences = await prisma.jobseekers.findUnique({
            where: {jobseeker_id: jobseekerId},
            select: {
                jobseeker_id: true,
                targeted_pathway: true,
                employment_type_sought: true,
                pathways: {
                    select: {
                        pathway_title: true,
                    }
                }
            }
        });

        if (!preferences) {
            return NextResponse.json({error: `Jobseeker record not found for id: ${jobseekerId}`}, {status: 400});
        }

        const result: JsPreferencesDTO & {targetedPathway?: string} ={
            jobseekerId: preferences.jobseeker_id,
            targetedPathwayId: preferences.targeted_pathway,
            targetedPathway: preferences.pathways?.pathway_title,
            preferredEmploymentType: preferences.employment_type_sought
        };

        return NextResponse.json({success: true, result}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: `Failed to update skills: ${error.message}`}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
