import { NextResponse } from 'next/server';
import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import { auth } from '@/auth';
import { Role } from '@/data/dtos/UserInfoDTO';

export async function GET(
  request: Request,
  props: { params: Promise<{ jobseekerId: string }> },
) {
  const params = await props.params;
  try {
    let session = await auth();

    // Check if the session exists
    if (!session?.user) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const {
      roles,
      employeeIsApproved,
      jobseekerId: userJobseekerId,
    } = session.user;
    const jobseekerId = params.jobseekerId;

    // Allow access if:
    // 1. The user is an EMPLOYER and is approved, OR ADMIN, OR...
    // 2. The user is a JOBSEEKER and their jobseekerId matches the requested jobseekerId
    const isEmployerApproved =
      (roles.includes(Role.EMPLOYER) && employeeIsApproved) ||
      roles.includes(Role.ADMIN);
    const isJobseekerViewingOwnData =
      roles.includes(Role.JOBSEEKER) && userJobseekerId === jobseekerId;

    // if (!isEmployerApproved && !isJobseekerViewingOwnData) {
    //   return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    // }

    const jobseekerEmployerView = await getJobSeekerEmployerView(jobseekerId);

    if (!jobseekerEmployerView) {
      return NextResponse.json(
        { error: 'Jobseeker not found' },
        { status: 404 },
      );
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
