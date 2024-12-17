import { NextResponse } from 'next/server';
import getPrismaClient from '@/app/lib/prismaClient.mjs';
import { PrismaClient } from '@prisma/client';
import { getResumeUrl } from '@/app/lib/services/azureBlobService';
import { auth } from '@/auth';

const prisma: PrismaClient = getPrismaClient();

export async function GET() {
  const session = await auth();
  if (!session?.user.jobseekerId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  try {
    const result = await prisma.jobseekerJobPosting.findMany({
      include: {
        job_posting: true,
      },
      where: {
        jobseekerId: session.user.jobseekerId,
        jobStatus: 'Bookmarked',
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
