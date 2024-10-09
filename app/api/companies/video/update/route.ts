import { NextResponse } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma: PrismaClient = getPrismaClient();

export async function PATCH(request: Request) {
    try {
        // Get essentials from session, not the request
        let session = await auth();
        const companyId: string | null | undefined = session?.user.companyId;

        const body: { companyId: string, videoUrl: string } = await request.json();
        const { videoUrl} = body;

        if (!companyId || !session?.user.employeeIsApproved) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required, and user must be approved.`}, {status: 400})
        }

        const result = await prisma.companies.update({
            where: {
                company_id: companyId,
            },
            data: {
                company_video_url: videoUrl
            }
        })
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (e: any) {
        console.error('Error updating company video url.', e.message);
        return NextResponse.json(
            {
                error: `Failed to update company video url..\n${e.message}`,
            },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}
