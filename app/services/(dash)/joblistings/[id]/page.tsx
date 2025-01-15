import { getJobListingById } from "@/app/lib/joblistings";
import JobPostingPage from "@/app/ui/components/jobPostings/JobPostingPage";
import Link from "next/link";
import { auth } from "@/auth";

export default async function page(props:{params: Promise<{id:string}>}) {
    const params = await props.params;
    const joblisting = await getJobListingById(params.id);
    const session = await auth();
    const connectedJobApplication = joblisting?.jobApplications.find(app => (
        app.jobPostId === params.id
        && app.jobseekerId === session?.user.jobseekerId
    ));
    const listingWithJobseeker = {
        ...joblisting,
        jobStatus: connectedJobApplication?.jobStatus ?? "",
        isBookmarked: connectedJobApplication?.isBookmarked ?? false,
        job_posting_id: joblisting?.job_posting_id ?? "",
    }
    if(joblisting == null || joblisting == undefined){
        return(
            <main className="h-screen text-center space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px]">
                <h1 className="text-4xl">Job Listing Not Found</h1>
                <Link href="/services/joblistings" className='LINK'>Find Active Job Listings Here</Link>
            </main>
        );
    }

    return <JobPostingPage joblisting={listingWithJobseeker} params={params} />;
}