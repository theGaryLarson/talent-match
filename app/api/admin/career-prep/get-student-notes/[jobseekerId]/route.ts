import { NextResponse } from 'next/server';
import {
  CategorizedNotes,
  getCareerPrepStudentNotes,
} from '@/app/lib/admin/careerPrep';

export async function GET(
  request: Request,
  { params }: { params: { jobseekerId: string } },
) {
  const jobseekerId = params.jobseekerId;
  if (!jobseekerId) {
    return NextResponse.json(
      { error: 'jobseekerId is required.' },
      { status: 400 },
    );
  }

  const data: CategorizedNotes = await getCareerPrepStudentNotes(jobseekerId);
  return NextResponse.json(data);
}
