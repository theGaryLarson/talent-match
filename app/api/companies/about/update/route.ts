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

        const body: { aboutUs: string } = await request.json();
        const { aboutUs} = body;

        // validate the companyId and verify the user is an approved employee
        if (!companyId) {
            return NextResponse.json({success: false, error: `A uuidv4 companyId is required.`}, {status: 400});
        }
        if (!session?.user.employeeIsApproved) {
            return NextResponse.json({success: false, error: `Employee needs to be approved to edit this company.`}, {status: 401});
        }

        
        const result = await prisma.companies.update({
            where: {
                company_id: companyId,
            },
            data: {
                about_us: aboutUs
            }
        })
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (e: any) {
        console.error('Error updating company about content.', e.message);
        return NextResponse.json(
            {
                error: `Failed to update company about content..\n${e.message}`,
            },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}
