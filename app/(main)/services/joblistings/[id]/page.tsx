import { getJobListingById } from "@/app/lib/joblistings";
import ApplyToJobButton from "@/app/ui/components/jobPostings/ApplyToJobButton";
import SaveJobPostButton from "@/app/ui/components/jobPostings/SaveJobPostButton";
import { auth } from "@/auth";

export default async function page({params}:{params: {id:string}}){
    const jobListing = await getJobListingById(params.id);
    const session = await auth();
    console.log(jobListing)
    return(
        <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
            <h1 className="text-xl ">{jobListing?.job_title}</h1>
            <h1 className="text-xl REPLACE-BEFORE-RELEASE">NOTE THIS IS UNSTYLED AND JUST HAS ALL OF THE INFO OF THE Job Listing in question</h1>
            {JSON.stringify(jobListing).split(',').map((e)=><p key={e}>{e}</p>)}
            {session?.user.jobseekerId?
            <div className="flex gap-2"><SaveJobPostButton id={params.id}/><ApplyToJobButton id={params.id}/></div>:null}
            
        </main>


    );}