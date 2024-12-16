import { NextResponse } from 'next/server';
import { getJobSeekerEmployerView } from '@/app/lib/prisma';

// const prisma: PrismaClient = getPrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { jobseekerId: string } },
) {
  try {
    const jobseekerId = params.jobseekerId;
    const jobseekerEmployerView = await getJobSeekerEmployerView(jobseekerId);

    if (!jobseekerEmployerView) {
      return NextResponse.json({ error: 'Jobseeker not found' }, { status: 404 });
    }

    return NextResponse.json(jobseekerEmployerView);
  } catch (e: any) {
    console.error('Error retrieving jobseeker employer view:', e.message);
    return NextResponse.json(
      { error: `Failed to retrieve jobseeker employer view.\n${e.message}` },
      { status: 500 },
    );
  }
}
