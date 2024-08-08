import { NextResponse } from 'next/server';
import {PrismaClient, ProjectExperiences} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: {params: {projectId: string}}) {
    let projId = null;
    try {
        const projectId = params.projectId;
        projId = projectId;

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

        return NextResponse.json({ success: true, result: {deletedEntry: deletedEntry, skills: skillsCount }});

    } catch (e: any) {
        console.log(e.message);
        const msg = projId ? `(No Jobseeker Project record with id ${projId})` : `unknown id`;
        return NextResponse.json({ error: `Failed to delete jobseeker project with id: ${msg}` });
    } finally {
        await prisma.$disconnect();
    }
}
