import { getJobListingById } from "@/app/lib/joblistings";
import Bookmark from "@/app/ui/components/Bookmark";
import ApplyToJobButton from "@/app/ui/components/jobPostings/ApplyToJobButton";
import { auth } from "@/auth";

export default async function page({params}:{params: {id:string}}){
    const jobListing = await getJobListingById(params.id);
    const session = await auth();
    console.log(jobListing)
    return(
        <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
            <div className="">
            <h1 className="text-4xl flex items-center ">{jobListing?.job_title} @ {jobListing?.companies.company_name} {session?.user.jobseekerId?<Bookmark bookmarked={(jobListing?.jobseekersThatBookMarked.some((e)=>e.jobseeker_id == session?.user.jobseekerId))??false} addUrl={`/api/joblistings/bookmark/add/${jobListing?.job_posting_id}`} removeUrl={`/api/joblistings/bookmark/remove/${jobListing?.job_posting_id}`}/>:''}</h1>
            <p className="text-sm">Posted: {jobListing?.publish_date.toDateString()} Open Until: {jobListing?.unpublish_date.toDateString()}</p>
            </div>
            <p>Job Description: {jobListing?.job_description}</p>
            <h1 className="text-xl REPLACE-BEFORE-RELEASE">NOTE THIS IS UNSTYLED AND JUST HAS ALL OF THE INFO OF THE Job Listing in question</h1>
            {JSON.stringify(jobListing).split(',').map((e)=><p key={e}>{e}</p>)}
            {session?.user.jobseekerId?
            <div className="flex gap-2"><ApplyToJobButton id={params.id}/></div>:null}
            
        </main>


    );}