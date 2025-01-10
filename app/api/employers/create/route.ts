import { NextResponse } from 'next/server';
import { createEmployer } from '@/app/lib/employer';
import { auth } from '@/auth';

export async function POST() {
  try {
    let session = await auth();
    const userId: string = session?.user.id!;
    const employerData = await createEmployer(userId);
    return NextResponse.json(
      { success: true, message: 'Employer created successfully.', employerData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create Employer.' },
      { status: 500 },
    );
  }
}
