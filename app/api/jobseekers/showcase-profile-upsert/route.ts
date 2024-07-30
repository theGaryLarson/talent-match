import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import getPrismaClient from "@/app/lib/prismaClient.mjs";

const prisma = getPrismaClient();
export async function POST(request: Request) {
    try {
        const body = await request.json();

    } catch (error: any) {

    }finally {
        await prisma.$disconnect();
    }
}