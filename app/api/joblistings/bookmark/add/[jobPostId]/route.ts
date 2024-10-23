import { bookmarkJobPosting } from "@/app/lib/joblistings";
import {NextResponse} from "next/server";


export async function POST(request: Request, {params}: {params: {jobPostId: string}}) {
    const jobPostId = params.jobPostId;
    if (!jobPostId) {
        return NextResponse.json({ error: 'jobPostId is required.' }, { status: 400 });
    }
    return  NextResponse.json(await bookmarkJobPosting(jobPostId));
}