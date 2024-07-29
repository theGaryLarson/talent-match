import { NextResponse } from 'next/server';
import {jobseekers_education, PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request) {
    let jsEduId = null;
    try {
        const body = await request.json();
        const { jobseekerEdId } = body;
        jsEduId = jobseekerEdId;
        const deletedEntry: jobseekers_education = await prisma.jobseekers_education.delete({
            where: {
                jobseekerEdId: jsEduId,
            }
        });
        return NextResponse.json({ success: true, result: deletedEntry });
    } catch (e: any) {
        console.log(e.message);
        const msg = jsEduId ? `(No Jobseeker Education record with id ${jsEduId})` : `unknown id`;
        return NextResponse.json({ error: `Failed to delete jobseeker education with id: ${msg}` });
    } finally {
        await prisma.$disconnect();
    }
}
