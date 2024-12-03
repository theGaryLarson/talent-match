import { NextResponse } from "next/server";
import { getCareerPrepStudentSummary } from "@/app/lib/admin/careerPrep";

export async function GET(request: Request, { params }: { params: { jobseekerId: string } }) {
    const  jobseekerId = params.jobseekerId;
    if (!jobseekerId) {
        return NextResponse.json({ error: 'jobseekerId is required.' }, { status: 400 });
    }
    // includes student detail and notes sorted by type
    const data = await getCareerPrepStudentSummary(jobseekerId);
    return NextResponse.json(data);
}