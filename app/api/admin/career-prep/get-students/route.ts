import { NextResponse } from 'next/server';
import {CareerPrepJobseekerCardViewDTO, getAllCareerPrepStudentsCardView} from "@/app/lib/admin/careerPrep";

export async function GET() {
    const data: CareerPrepJobseekerCardViewDTO[] | null = await getAllCareerPrepStudentsCardView();

    if (data === null) {
        // Return a 500 error response if data is null due to an error
        return NextResponse.json({ error: 'Failed to Career Prep Jobseeker Card view data' }, { status: 500 });
    }

    return NextResponse.json(data);
}
