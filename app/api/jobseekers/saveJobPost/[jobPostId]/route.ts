import {NextResponse} from "next/server";
import {bookmarkJobPosting} from "@/app/lib/prisma";

export async function POST(request: Request, {params}: {params: {jobPostId: string}}) {
    const jobPostId = params.jobPostId;
    if (!jobPostId) {
        return NextResponse.json({ error: 'jobPostId is required.' }, { status: 400 });
    }
    return await bookmarkJobPosting(jobPostId);
}