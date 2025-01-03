import {NextResponse} from "next/server";
import { ApplyToJob } from "@/app/lib/joblistings";
import { sendJobApplicantEmailNotificationEmail } from "@/lib/smtp/sendJobApplicantEmailNotificationEmail";

export async function POST(request: Request, props: {params: Promise<{jobPostId: string}>}) {
    const params = await props.params;
    const jobPostId = params.jobPostId;
    if (!jobPostId) {
        return NextResponse.json({ error: 'jobPostId is required.' }, { status: 400 });
    }
    const result = await ApplyToJob(jobPostId);
    sendJobApplicantEmailNotificationEmail({
        applicantName: '',
        jobId: result.jobPostId,
        navigatorName: "",
        jobTitle: "",
        Company: ""
    })
    return NextResponse.json(result);
}