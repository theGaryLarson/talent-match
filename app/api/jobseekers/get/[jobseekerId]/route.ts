import { NextResponse } from 'next/server';
import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import { auth } from "@/auth";
import {Role} from "@/data/dtos/UserInfoDTO";


export async function GET(
  request: Request,
  { params }: { params: { jobseekerId: string } },
) {
  try {
    let session = await auth();

    // Check if the session exists, user has the EMPLOYER role, and is approved
    if (!session?.user ||
      !session.user.roles.includes(Role.EMPLOYER) ||
      !session.user.employeeIsApproved) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

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
