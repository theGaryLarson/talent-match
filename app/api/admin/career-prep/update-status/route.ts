import { NextResponse } from "next/server";
import { bookmarkJobseeker } from "@/app/lib/prisma";
import {CareerPrepStatus, updateCareerPrepStatusCardView} from "@/app/lib/admin/careerPrep";

export async function PATCH(request: Request, {params}: {params: {jobseekerId: string, status: CareerPrepStatus}}) {
    const { jobseekerId, status } = params;
    if (!jobseekerId) {
        return NextResponse.json({ error: 'jobseekerId is required.' }, { status: 400 });
    }
    if (!status) {
        return NextResponse.json({ error: 'status entry required.' }, { status: 400 });
    }
    const data = await updateCareerPrepStatusCardView(jobseekerId, status);
    return NextResponse.json(data);
}