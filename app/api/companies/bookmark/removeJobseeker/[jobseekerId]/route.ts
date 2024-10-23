import { NextResponse } from "next/server";
import { unbookmarkJobseeker } from "@/app/lib/prisma";

export async function POST(request: Request, {params}: {params: {jobseekerId: string}}) {
    const jobseekerId = params.jobseekerId;
    if (!jobseekerId) {
        return NextResponse.json({ error: 'jobseekerId is required.' }, { status: 400 });
    }
    return await unbookmarkJobseeker(jobseekerId);
}