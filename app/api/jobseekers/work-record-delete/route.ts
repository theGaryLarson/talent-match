import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request) {
    let jsWorkExpId = null;
    try {
        const body = await request.json();
        const { workId } = body;
        jsWorkExpId = workId;
        const deletedEntry = await prisma.workExperience.delete({
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
