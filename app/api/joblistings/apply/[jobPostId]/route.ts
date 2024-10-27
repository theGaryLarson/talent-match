import {NextResponse} from "next/server";
import { ApplyToJob } from "@/app/lib/joblistings";

export async function POST(request: Request, {params}: {params: {jobPostId: string}}) {
    const jobPostId = params.jobPostId;
    if (!jobPostId) {
        return NextResponse.json({ error: 'jobPostId is required.' }, { status: 400 });
    }
    console.log("api noticed")
    const result = await ApplyToJob(jobPostId);
    return NextResponse.json(result);
}