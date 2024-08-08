import { NextResponse } from 'next/server';
import {PrismaClient, WorkExperience} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: {params: {workId: string}}) {
    let jsWorkExpId = null;
    try {
        const workId = params.workId;
        jsWorkExpId = workId;
        const deletedEntry: WorkExperience = await prisma.workExperience.delete({
            where: {
                workId: jsWorkExpId,
            }
        });
        return NextResponse.json({ success: true, result: deletedEntry });
    } catch (e: any) {
        console.log(e.message);
        const msg = jsWorkExpId ? `(No Jobseeker Work Experience record with id ${jsWorkExpId})` : `unknown id`;
        return NextResponse.json({ error: `Failed to delete jobseeker work experience with id: ${msg}` });
    } finally {
        await prisma.$disconnect();
    }
}
