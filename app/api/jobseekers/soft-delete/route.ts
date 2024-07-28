import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    let jsId = null;
    try {
        const body =  await request.json();
        const { jobseekerId } = body;
        jsId = jobseekerId;
        const jsMarkedForDeletion = await prisma.jobseekers.update({
            where: {
                jobseeker_id: jsId,
            },
            data: {
                is_marked_deletion: new Date()
            }
        });
        return NextResponse.json({success: true, result: jsMarkedForDeletion});
    }  catch (e: any) {
        console.log(e.message);
        const msg = jsId ? `(No record with id ${jsId})` : `unknown id`;
        return NextResponse.json({ error: `Failed to delete jobseeker with id: ${msg}` });
    } finally {
        await prisma.$disconnect();
    }
}