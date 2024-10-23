import { NextResponse } from "next/server";
import { removeJobseekerBookmark } from "@/app/lib/prisma";

export async function POST(request: Request, {params}: {params: {jobseekerId: string}}) {
    const jobseekerId = params.jobseekerId;
    if (!jobseekerId) {
        return NextResponse.json({ error: 'jobseekerId is required.' }, { status: 400 });
    }
    return await removeJobseekerBookmark(jobseekerId);
}