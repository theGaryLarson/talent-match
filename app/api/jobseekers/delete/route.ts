import { NextResponse } from 'next/server';
import { deleteJobseeker } from '@/app/lib/jobseeker';
import { auth } from '@/auth';

export async function DELETE() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
  }

  try {
    // Call deleteJobseeker and wait for its resolution
    await deleteJobseeker(userId);
    // If successful, return a success response
    return NextResponse.json(
      { success: true, message: 'Jobseeker deleted successfully.' },
      { status: 200 },
    );
  } catch (error: any) {
    // If an error occurs, return an error response with a 500 status code
    return NextResponse.json(
      { error: 'Failed to delete jobseeker.' },
      { status: 500 },
    );
  }
}
