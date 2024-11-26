import { getJobSeekerAppliedJobs } from "@/app/lib/joblistings";
import Link from "next/link";

export default async function page(){
    const myAppliedJobs = await getJobSeekerAppliedJobs();
    if(myAppliedJobs === undefined || myAppliedJobs.length == 0){
      return (
        <div><p>No Applications Found: <Link href={'/services/jobseekers/dashboard/jobsearch'} className='LINK'>Find Job Listings here</Link></p></div>
      );
    }
    return(
<main>
<h1 className="font-bold text-xl">
      Applied Jobs
    </h1>
    <div>
      {
        myAppliedJobs.map((job)=><div key={job.job_posting_id}><Link href={`/services/joblistings/${job.job_posting_id}`}>{job.job_title}</Link></div>)
      }
    </div>
</main>
    );
}