import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function POST(request: Request) {
    let jsId = null;
    let jsMarkedForDeletion = null;
    try {
        const body =  await request.json();
        const { jobseekerId } = body;
        jsId = jobseekerId;
        jsMarkedForDeletion = await prisma.jobseekers.update({
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
        const msg = jsMarkedForDeletion ? `Failed to mark jobseeker with id: ${jsId} for deletion`  : `No record with id ${jsId})`;
        return NextResponse.json({ error: msg });
    } finally {
        await prisma.$disconnect();
    }
}