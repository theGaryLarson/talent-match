import { NextResponse } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';
import { getResumeUrl } from '@/app/lib/services/azureBlobService';

const prisma: PrismaClient = getPrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const userId = params.userId;
    const url = await getResumeUrl(userId);

    if (!url) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(url);
  } catch (e: any) {
    console.error('Error retrieving resume from Blob storage:', e.message);
    return NextResponse.json(
      { error: `Failed to retrieve resume for user.\n${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
