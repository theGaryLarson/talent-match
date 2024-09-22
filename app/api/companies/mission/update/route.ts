import { NextResponse } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = getPrismaClient();

export async function PATCH(request: Request) {
    try {
        const body: { companyId: string, mission: string } = await request.json();
        const {companyId, mission} = body;
        const result = await prisma.companies.update({
            where: {
                company_id: companyId,
            },
            data: {
                company_mission: mission
            }
        })
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (e: any) {
        console.error('Error updating company mission content.', e.message);
        return NextResponse.json(
            {
                error: `Failed to update company mission content..\n${e.message}`,
            },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}
