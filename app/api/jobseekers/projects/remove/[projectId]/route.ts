import {NextResponse} from 'next/server';
import {PrismaClient, ProjectExperiences} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: { params: { projectId: string } }) {
    let projId = null;
    try {
        projId = params.projectId;

        const skillsCount = await prisma.project_has_skills.deleteMany({
            where: {
                project_experiences: {
                    projectId: projId,
                }
            }
        });

        const deletedEntry: ProjectExperiences = await prisma.projectExperiences.delete({
            where: {
                projectId: projId,
            }
        });

        const result = {
            ...deletedEntry,
            skillsCount
        }

        return NextResponse.json({success: true, result});

    } catch (e: any) {
        console.log(e.message);
        const msg = projId ? `(No Jobseeker Project record with id ${projId})` : `unknown id`;
        return NextResponse.json({error: `Failed to delete jobseeker project with id: ${msg}`});
    } finally {
        await prisma.$disconnect();
    }
}
