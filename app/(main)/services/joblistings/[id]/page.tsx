import { getJobListingById } from "@/app/lib/joblistings";

export default async function page({params}:{params: {id:string}}){
    const jobListing = await getJobListingById(params.id);
    console.log(jobListing)
    return(
        <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
            <h1 className="text-xl ">{jobListing?.job_title}</h1>
            <h1 className="text-xl REPLACE-BEFORE-RELEASE">NOTE THIS IS UNSTYLED AND JUST HAS ALL OF THE INFO OF THE Job Listing in question</h1>
            {JSON.stringify(jobListing).split(',').map((e)=><p>{e}</p>)}
        </main>


    );}