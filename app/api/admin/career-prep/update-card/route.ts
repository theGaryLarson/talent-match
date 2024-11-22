import { NextResponse } from "next/server";
import {CareerPrepStatus, updateCareerPrepStatusCardView} from "@/app/lib/admin/careerPrep";

export async function PATCH(request: Request) {
    const body:{jobseekerId: string, status?: CareerPrepStatus, expectedEndDate?: Date} = await request.json();
    if (!body.jobseekerId) {
        return NextResponse.json({ error: 'jobseekerId is required.' }, { status: 400 });
    }
    const data = await updateCareerPrepStatusCardView(body.jobseekerId, body.status);
    return NextResponse.json(data);
}