import { NextResponse } from "next/server";
import {CareerPrepStatus, updateCareerPrepStatusCardView} from "@/app/lib/admin/careerPrep";

export async function PATCH(request: Request, {params}: {params: {jobseekerId: string, status?: CareerPrepStatus, expectedEndDate?: Date}}) {
    const { jobseekerId, status, expectedEndDate } = params;
    if (!jobseekerId) {
        return NextResponse.json({ error: 'jobseekerId is required.' }, { status: 400 });
    }

    const data = await updateCareerPrepStatusCardView(jobseekerId, status, expectedEndDate);
    return NextResponse.json(data);
}