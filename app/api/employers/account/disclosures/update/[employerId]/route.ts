import { NextResponse } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import {employers, PrismaClient} from '@prisma/client';

const prisma: PrismaClient = getPrismaClient();

export async function PATCH(request: Request, {params}: { params: { employerId: string } }) {
    try {
        const employerId = params.employerId;
        if (!employerId) {
            return NextResponse.json({success: false, error: `A uuidv4 employerId  is required.`}, {status: 400})
        }
        const body: Partial<employers> = await request.json();
        const { job_title, linkedin_url, work_address_id, hasAgreedTerms } = body;
        const result = await prisma.employers.update({
            where: {
                employer_id: employerId,
            },
            data: {
                job_title,
                linkedin_url,
                work_address_id,
                hasAgreedTerms,
            },
            select: {
                job_title: true,
                linkedin_url: true,
                work_address_id: true,
                hasAgreedTerms: true,
            }
        })
        return NextResponse.json({ success: true, result }, { status: 200 });
    } catch (e: any) {
        console.error('Error retrieving company name.', e.message);
        return NextResponse.json(
            {
                error: `Failed to retrieve company name.\n${e.message}`,
            },
            { status: 500 },
        );
    } finally {
        await prisma.$disconnect();
    }
}