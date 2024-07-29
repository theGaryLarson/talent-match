import { NextResponse } from 'next/server';
import {certificates, PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma: PrismaClient = getPrismaClient();

export async function DELETE(request: Request) {
    let certificateId = null;
    try {
        const body = await request.json();
        const { certId } = body;
        certificateId = certId;
        const deletedEntry: certificates = await prisma.certificates.delete({
            where: {
                certId: certificateId,
            }
        });
        return NextResponse.json({ success: true, result: deletedEntry });
    } catch (e: any) {
        console.log(e.message);
        const msg = certificateId ? `(No Jobseeker Certificate record with id ${certificateId})` : `unknown id`;
        return NextResponse.json({ error: `Failed to delete jobseeker certificate with id: ${msg}` });
    } finally {
        await prisma.$disconnect();
    }
}
