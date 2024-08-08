import {NextResponse} from 'next/server';
import {jobseekers_education, PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request, {params}: {params: {eduId: string}}) {
    let eduId = null;
    try {
        eduId = params.eduId;
        const deletedEntry: jobseekers_education = await prisma.jobseekers_education.delete({
            where: {
                jobseekerEdId: eduId,
            }
        });
        return NextResponse.json({ success: true, result: deletedEntry });
    } catch (e: any) {
        console.log(e.message);
        const msg = eduId ? `(No Jobseeker Education record with id ${eduId})` : `unknown id`;
        return NextResponse.json({ error: `Failed to delete jobseeker education with id: ${msg}` });
    } finally {
        await prisma.$disconnect();
    }
}
