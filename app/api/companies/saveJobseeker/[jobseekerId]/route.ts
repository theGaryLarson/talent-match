import { NextResponse } from "next/server";
import { bookmarkJobseeker } from "@/app/lib/prisma";

export async function POST(request: Request, {params}: {params: {jobseekerId: string}}) {
    const jobseekerId = params.jobseekerId;
    if (!jobseekerId) {
        return NextResponse.json({ error: 'jobPostId is required.' }, { status: 400 });
    }
    return await bookmarkJobseeker(jobseekerId);
}