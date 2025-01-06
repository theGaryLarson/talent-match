import {NextResponse} from "next/server";
import { WithdrawFromJob } from "@/app/lib/joblistings";
import { sendJobApplicantEmailNotificationEmail } from "@/lib/smtp/sendJobApplicantEmailNotificationEmail";

export async function POST(request: Request, props: {params: Promise<{jobPostId: string}>}) {
    const params = await props.params;
    const jobPostId = params.jobPostId;
    if (!jobPostId) {
        return NextResponse.json({ error: 'jobPostId is required.' }, { status: 400 });
    }
    const result = await WithdrawFromJob(jobPostId);
    return NextResponse.json(result);
}