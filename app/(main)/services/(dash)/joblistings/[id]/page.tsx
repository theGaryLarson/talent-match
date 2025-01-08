import { getJobListingById } from "@/app/lib/joblistings";
import JobPostingPage from "@/app/ui/components/jobPostings/JobPostingPage";
import Link from "next/link";
// import { auth } from "@/auth";

export default async function page(props:{params: Promise<{id:string}>}) {
    const params = await props.params;
    const joblisting = await getJobListingById(params.id);
    const connectedJobApplication = joblisting?.jobApplications.find(app => app.jobPostId === params.id);
    const listingWithJobseeker = {
        ...joblisting,
        jobStatus: connectedJobApplication?.jobStatus ?? "",
        isBookmarked: connectedJobApplication?.isBookmarked ?? false,
        job_posting_id: joblisting?.job_posting_id ?? "",
    }
    // const session = await auth();
    if(joblisting == null || joblisting == undefined){
        return( <main className="h-screen text-center space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px]">
            <h1 className="text-4xl">Job Listing Not Found</h1>
            <Link href="/services/joblistings" className='LINK'>Find Active Job Listings Here</Link>
            </main>);
    }

    return <JobPostingPage joblisting={listingWithJobseeker} params={params} />;

    // return(
    //     <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px]">
    //         <div className="">
    //         <h1 className="text-4xl flex items-center justify-center ">{jobListing?.job_title} @ {jobListing?.companies.company_name} {session?.user.jobseekerId?<Bookmark bookmarked={(jobListing?.jobApplications.some((e)=>e.jobseekerId == session?.user.jobseekerId))??false} addUrl={`/api/joblistings/bookmark/add/${jobListing?.job_posting_id}`} removeUrl={`/api/joblistings/bookmark/remove/${jobListing?.job_posting_id}`}/>:''}
    //         {(session?.user.companyId === jobListing?.company_id)? <DeleteJobPostingButton id={params.id}/>:''}
    //         </h1>
    //         <p className="text-sm">Posted: {jobListing?.publish_date.toDateString()} Open Until: {jobListing?.unpublish_date.toDateString()}</p>
    //         </div>
    //         <p>Job Description: {jobListing?.job_description}</p>
    //         <h1 className="text-xl REPLACE-BEFORE-RELEASE">NOTE THIS IS UNSTYLED AND JUST HAS ALL OF THE INFO OF THE Job Listing in question</h1>
    //         {JSON.stringify(jobListing).split(',').map((e)=><p key={e}>{e}</p>)}
    //         {session?.user.jobseekerId?
    //         <div className="flex gap-2"><ApplyToJobButton id={params.id}/></div>:null}
    //     </main>
    // );
}